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

@Injectable()
export class RPCListenerService implements OnApplicationBootstrap {
  private wsProvider: ethers.providers.WebSocketProvider;
  private chainId: number;
  constructor(
    private configService: ConfigService,
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
        this.subscribeToEvent(eventType, contract, contractType);
      });
    });

    console.log(`RPC Listener startet`);
  }

  subscribeToEvent(eventType: EventType, contract: Contract, contractType: ContractType): void {
    contract.on(eventType, (...eventValues) => {
      const event = eventValues.pop();
      event['contractType'] = contractType;
      event['chainId'] = this.chainId;
      console.log(event);
      this.handleEvent(event);
    });
    console.log(`RPC Listener listens to: ${contract.address} ${contractType} ${eventType}`);
  }

  handleEvent(event: IEventMessage): void {
    try {
      void this.scBlockchainEventsService.send({ cmd: 'new-event' }, event).subscribe({});
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
