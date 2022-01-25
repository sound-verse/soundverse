import { Injectable, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Web3 from 'web3';
import config from 'config';
import ERC1155ContractAbi from '../blockchain/abis/ERC1155Contract.abi.json';
import _ from 'lodash';

@Injectable()
export class ListenerService implements OnApplicationBootstrap, OnModuleDestroy {
  private web3: Web3;
  private options;
  private config;

  constructor(private configService: ConfigService) {
    this.web3 = new Web3(configService.get('RPC_URL'));
    this.config = config.get('RPCListenerConfig');
  }

  async onApplicationBootstrap() {
    this.options = {
      filter: {
        value: [],
      },
      fromBlock: await this.getLatestBlock(),
    };
    this.listen();
  }

  onModuleDestroy() {
    console.log(`Listener service shutted down at block number: ${this.getLatestBlock()}`);
  }

  async getLatestBlock(): Promise<number> {
    return await this.web3.eth.getBlockNumber();
  }

  listen() {
    this.config.ContractEvents.forEach((contractEvent) => {
      const abi = this.parseAbi(contractEvent.type);
      if (!abi) {
        return;
      }
      const contract = new this.web3.eth.Contract(abi, contractEvent.contractAddress);
      contractEvent.listensTo.forEach((eventName) => {
        this.subscribeToEvent(eventName, contract, abi);
      });
    });
  }

  subscribeToEvent(eventName: string, contract, abi): void {
    const event = this.parseEventName(eventName, contract);

    if (!event) {
      return;
    }

    event(this.options, (error, eventLog) => {
      if (error) {
        console.log(`RPC Listener received error ${error}`);
      }

      this.handleEvent(eventLog, eventName, contract);
    });
  }

  handleEvent(eventLog, eventName, contract) {
    // const eventJsonInterface = _.find(
    //   contract._jsonInterface,
    //   (o) => o.name === eventName && o.type === 'event',
    // );

    // console.log(
    //   this.web3.eth.abi.decodeLog(eventJsonInterface.inputs, eventLog.raw.data, eventLog.raw.topics.slice(1)),
    // );

    console.log(eventLog);
  }

  parseEventName(eventName: string, contract) {
    let event = undefined;
    switch (eventName) {
      case 'TransferSingle': {
        event = contract.events.TransferSingle;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return event;
  }

  parseAbi(type: string) {
    let abi = undefined;

    switch (type) {
      case 'ERC1155': {
        abi = ERC1155ContractAbi;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return abi;
  }
}
