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
import { Interval } from '@nestjs/schedule';

@Injectable()
export class RPCListenerService implements OnApplicationBootstrap {
  private wsProvider: ethers.providers.WebSocketProvider;
  private chainId: number;
  constructor(
    private configService: ConfigService,
    private rpcHistoryService: RPCHistoryService,
    @Inject('SC_BLOCKCHAIN_EVENTS_SERVICE') private scBlockchainEventsService: ClientProxy,
  ) {
    this.wsProvider = new ethers.providers.WebSocketProvider(configService.get('RPC_URL'));
  }

  async onApplicationBootstrap() {
    try {
      const { chainId } = await this.wsProvider.getNetwork();
      this.chainId = chainId;
      await this.scBlockchainEventsService.connect();
      this.listen();
    } catch (e) {
      console.log('ERROR: could not connect to RPC node!', e);
    }
  }

  listen() {
    const contractEvents =
      this.configService.get('RPCListenerConfig')[this.configService.get('ENVIRONMENT')].contractEvents;
    contractEvents.forEach((contractEvent) => {
      const contractType: ContractType = contractEvent.contractType;
      const abi = this.parseAbi(contractType);
      const contract = new ethers.Contract(contractEvent.contractAddress as string, abi, this.wsProvider);
      contractEvent.listensTo.forEach((eventType: EventType) => {
        void this.checkForMissedEvents(contract, eventType, contractType, 100000);
        this.subscribeToEvent(eventType, contract, contractType);
      });
    });

    console.log(`RPC Listener startet`);
  }

  @Interval(5 * 60 * 1000)
  checkForMissedEventsInterval() {
    const contractEvents =
      this.configService.get('RPCListenerConfig')[this.configService.get('ENVIRONMENT')].contractEvents;
    contractEvents.forEach((contractEvent) => {
      const contractType: ContractType = contractEvent.contractType;
      const abi = this.parseAbi(contractType);
      const contract = new ethers.Contract(contractEvent.contractAddress as string, abi, this.wsProvider);
      contractEvent.listensTo.forEach((eventType: EventType) => {
        void this.checkForMissedEvents(contract, eventType, contractType, 10000);
      });
    });
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
    const fromBlock = latestBlock - lookBackStep;
    const events = await contract.queryFilter(eventFilter, fromBlock);

    const eventTxHashes = events.map((event) => event.transactionHash);

    const missedTxHashes = await this.rpcHistoryService.getMissedTxHashed({
      contractAddress: contract.address,
      eventType,
      txHashes: eventTxHashes,
    });

    const missedEvents = events.filter((event) =>
      missedTxHashes.find((txHash) => txHash === event.transactionHash),
    );

    console.log(`Found: ${missedEvents.length} missing events.`);

    missedEvents.forEach((eventValues) => {
      const event = this.prepareEvent(eventValues, contractType, contract, eventType);
      this.handleEvent(event);
    });
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
