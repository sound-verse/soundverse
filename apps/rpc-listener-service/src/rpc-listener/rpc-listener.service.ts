import { Inject, Injectable, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Web3 from 'web3';
import _ from 'lodash';
import {
  IEventMessage,
  EventType,
  ContractType,
  MasterContract,
  MarketplaceContract,
  LicenseContract,
} from '@soundverse/shared-rpc-listener-service';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { ClientProxy } from '@nestjs/microservices';
import { utils } from 'ethers';

interface Options {
  filter: {
    value: string[];
  };
  fromBlock: number;
  chainId: number;
}

@Injectable()
export class RPCListenerService implements OnApplicationBootstrap, OnModuleDestroy {
  private web3: Web3;
  private options: Options;

  constructor(
    private configService: ConfigService,
    @Inject('SC_BLOCKCHAIN_EVENTS_SERVICE') private scBlockchainEventsService: ClientProxy,
  ) {
    this.web3 = new Web3(configService.get('RPC_URL'));
  }

  async onApplicationBootstrap() {
    try {
      this.options = {
        filter: {
          value: [],
        },
        fromBlock: await this.getLatestBlock(),
        chainId: await this.getChainId(),
      };

      await this.scBlockchainEventsService.connect();
      this.listen();
    } catch (e) {
      console.log('ERROR: could not connect to RPC node!', e);
    }
  }

  onModuleDestroy() {
    console.log(`Listener service shut down at block number: ${this.getLatestBlock()}`);
  }

  async getLatestBlock(): Promise<number> {
    return await this.web3.eth.getBlockNumber();
  }

  async getChainId(): Promise<number> {
    return await this.web3.eth.getChainId();
  }

  listen() {
    const contractEvents =
      this.configService.get('RPCListenerConfig')[this.configService.get('ENVIRONMENT')].contractEvents;
    contractEvents.forEach((contractEvent) => {
      const abi = this.parseAbi(contractEvent.contractType);

      if (!abi) {
        return;
      }

      const contract: Contract = new this.web3.eth.Contract(abi, contractEvent.contractAddress);
      contractEvent.listensTo.forEach((eventType: EventType) => {
        this.subscribeToEvent(eventType, contract, contractEvent.contractType);
      });
    });

    console.log(`RPC Listener startet`);
  }

  subscribeToEvent(eventType: EventType, contract: Contract, contractType: ContractType): void {
    const eventCall = this.getEventCall(eventType, contract);

    if (!eventCall) {
      return;
    }

    console.log(`RPC Listener listens to: ${contractType} ${eventType}`);

    try {
      eventCall(this.options, (error, event: IEventMessage) => {
        if (error) {
          console.log(`RPC Listener received error ${error}`);
        }
        event.contractType = contractType;
        event.chainId = this.options.chainId;
        this.handleEvent(event);
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleEvent(event: IEventMessage): void {
    try {
      void this.scBlockchainEventsService.send({ cmd: 'new-event' }, event).subscribe({});
    } catch (e) {
      console.log(`Error: Message could not be sent ${e}`);
    }
  }

  getEventCall(eventType: EventType, contract: Contract) {
    let event = undefined;
    switch (eventType) {
      case EventType.TRANSFER_SINGLE: {
        event = contract.events.TransferSingle;
        break;
      }
      case EventType.MASTER_MINT_EVENT: {
        event = contract.events.MasterMintEvent;
        break;
      }
      case EventType.UNLISTED_NFT: {
        event = contract.events.UnlistedNFT;
        break;
      }
      case EventType.TRANSFER: {
        event = contract.events.Transfer;
        break;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return event;
  }

  parseAbi(contractType: ContractType) {
    let abi: AbiItem[] = undefined;

    switch (contractType) {
      case ContractType.MARKETPLACE: {
        //Typecast reason: https://github.com/ChainSafe/web3.js/issues/3310
        abi = MarketplaceContract as AbiItem[];
        break;
      }
      case ContractType.MASTER: {
        //Typecast reason: https://github.com/ChainSafe/web3.js/issues/3310
        abi = MasterContract as AbiItem[];
        break;
      }
      case ContractType.LICENSE: {
        //Typecast reason: https://github.com/ChainSafe/web3.js/issues/3310
        abi = LicenseContract as AbiItem[];
        break;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return abi;
  }
}
