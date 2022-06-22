import { Inject, Injectable, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers, ContractInterface, Contract } from 'ethers';
import _ from 'lodash';
import {
  IEventMessage,
  EventType,
  ContractType,
  MasterContract,
  MarketplaceContract,
  LicenseContract,
} from '@soundverse/shared-rpc-listener-service';
import { ClientProxy } from '@nestjs/microservices';
import { RPCHistoryService } from '../rpc-history/rpc-history.service';

const EXPECTED_PONG_BACK = 15000;
const KEEP_ALIVE_CHECK_INTERVAL = 7500;

@Injectable()
export class RPCListenerService implements OnApplicationBootstrap {
  private wsProvider: ethers.providers.WebSocketProvider;
  private chainId: number;
  constructor(
    private configService: ConfigService,
    private rpcHistoryService: RPCHistoryService,
    @Inject('SC_BLOCKCHAIN_EVENTS_SERVICE') private scBlockchainEventsService: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.scBlockchainEventsService.connect();
      this.startConnection();
      const { chainId } = await this.wsProvider.getNetwork();
      this.chainId = chainId;
    } catch (e) {
      console.log('ERROR: could not connect to RPC node!', e);
    }
  }

  startConnection() {
    this.wsProvider = new ethers.providers.WebSocketProvider(this.configService.get('RPC_URL'));

    let pingTimeout = null;
    let keepAliveInterval = null;

    this.wsProvider._websocket.on('open', () => {
      keepAliveInterval = setInterval(() => {
        console.log('Checking if the connection is alive, sending a ping');

        this.wsProvider._websocket.ping();

        // Use `WebSocket#terminate()`, which immediately destroys the connection,
        // instead of `WebSocket#close()`, which waits for the close timer.
        // Delay should be equal to the interval at which your server
        // sends out pings plus a conservative assumption of the latency.
        pingTimeout = setTimeout(() => {
          this.wsProvider._websocket.terminate();
        }, EXPECTED_PONG_BACK);
      }, KEEP_ALIVE_CHECK_INTERVAL);

      this.listen();
    });

    this.wsProvider._websocket.on('close', () => {
      console.log('The websocket connection was closed');
      clearInterval(keepAliveInterval);
      clearTimeout(pingTimeout);
      this.startConnection();
    });

    this.wsProvider._websocket.on('pong', () => {
      console.log('Received pong, so connection is alive, clearing the timeout');
      clearInterval(pingTimeout);
    });
  }

  listen() {
    const contractEvents =
      this.configService.get('RPCListenerConfig')[this.configService.get('ENVIRONMENT')].contractEvents;
    contractEvents.forEach((contractEvent) => {
      const contractType: ContractType = contractEvent.contractType;
      const abi = this.parseAbi(contractType);
      const contract = new ethers.Contract(contractEvent.contractAddress as string, abi, this.wsProvider);
      contractEvent.listensTo.forEach((eventType: EventType) => {
        void this.checkForMissedEvents(contract, eventType, contractType, 1000000);
        this.subscribeToEvent(eventType, contract, contractType);
      });
    });

    console.log(`RPC Listener startet`);
  }

  async checkForMissedEvents(
    contract: Contract,
    eventType: EventType,
    contractType: ContractType,
    lookBackStep: number,
  ) {
    console.log('Checking for missed events...');
    const eventFilter = contract.filters[eventType]();
    const latestBlock = await this.wsProvider.getBlockNumber();
    const blockBatchSize = 10000;
    const iterations = lookBackStep / blockBatchSize;
    const batchArray: number[] = Array(Math.floor(iterations)).fill(blockBatchSize);
    batchArray[batchArray.length] = lookBackStep % blockBatchSize;
    let currentBatchPosition = latestBlock - lookBackStep;

    console.log(batchArray);
    console.log(batchArray.length);

    await Promise.all(
      batchArray.map(async (batchSize) => {
        const events = await contract.queryFilter(
          eventFilter,
          currentBatchPosition,
          currentBatchPosition + batchSize,
        );
        const eventTxHashes = events.map((event) => event.transactionHash);
        const missedTxHashes = await this.rpcHistoryService.getMissedTxHashed({
          contractAddress: contract.address,
          eventType,
          txHashes: eventTxHashes,
        });
        const missedEvents = events.filter((event) =>
          missedTxHashes.find((txHash) => txHash === event.transactionHash),
        );
        console.log(
          `Checked from block: ${currentBatchPosition} to block: ${
            currentBatchPosition + batchSize
          } where latest block is: ${latestBlock} and found ${missedEvents.length} lost events.`,
        );
        missedEvents.forEach((eventValues) => {
          const event = this.prepareEvent(eventValues, contractType, contract, eventType);
          this.handleEvent(event);
        });
        currentBatchPosition += batchSize;
      }),
    );
  }

  subscribeToEvent(eventType: EventType, contract: Contract, contractType: ContractType): void {
    contract.on(eventType, (...eventValues) => {
      const event = eventValues.pop();
      const preparedEvent = this.prepareEvent(event, contractType, contract, eventType);
      this.handleEvent(preparedEvent);
    });

    console.log(`RPC Listener listens to: ${contract.address} ${contractType} ${eventType}`);
  }

  prepareEvent(event: any, contractType: ContractType, contract: Contract, eventType: EventType) {
    event['contractType'] = contractType;
    event['chainId'] = this.chainId;
    void this.rpcHistoryService.add({
      contractAddress: contract.address,
      eventType,
      txHash: event.transactionHash,
    });
    return event;
  }

  handleEvent(event: IEventMessage): void {
    try {
      void this.scBlockchainEventsService.send({ cmd: 'new-event' }, event).subscribe({});
      console.log(event);
    } catch (e) {
      console.log(`Error: Message could not be sent ${e}`);
    }
  }

  parseAbi(contractType: ContractType) {
    let abi: ContractInterface = undefined;

    switch (contractType) {
      case ContractType.MARKETPLACE: {
        abi = MarketplaceContract;
        break;
      }
      case ContractType.MASTER: {
        abi = MasterContract;
        break;
      }
      case ContractType.LICENSE: {
        abi = LicenseContract;
        break;
      }
    }

    return abi;
  }
}
