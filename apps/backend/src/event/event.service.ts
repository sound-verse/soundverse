import { Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import {
  ContractType,
  ERC721MasterMintEventReturnValues,
  EventType,
  IEventMessage,
} from '@soundverse/shared-rpc-listener-service';
import * as amqp from 'amqplib';
import * as amqpConMgr from 'amqp-connection-manager';
import { NftService } from '../nft/nft.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EventService implements OnApplicationBootstrap {
  constructor(private nftService: NftService, private configService: ConfigService) {}

  async onApplicationBootstrap() {
    let connection = amqpConMgr.connect({
      url:
        'amqp://' +
        this.configService.get('RABBITMQ_USER') +
        ':' +
        this.configService.get('RABBITMQ_PASSWORD') +
        '@' +
        this.configService.get('RABBITMQ_HOST'),
    });
    const channelWrapper: amqpConMgr.ChannelWrapper = connection.createChannel({
      json: true,
      setup: async (channel: amqp.ConfirmChannel): Promise<void> => {
        // tslint:disable-next-line:await-promise
        await channel.assertQueue(this.configService.get('RABBITMQ_RECOVERY_QUEUE_NAME'), { durable: true });
      },
    });
  }

  async handleEvent(event: IEventMessage): Promise<void> {
    const contractType: ContractType = event.contractType;
    const eventType: EventType = event.event;
    const nullAddress = '0x0000000000000000000000000000000000000000';
    switch (contractType) {
      case ContractType.ERC721: {
        switch (eventType) {
          case EventType.MASTER_MINT_EVENT: {
            const returnValues: ERC721MasterMintEventReturnValues = event.returnValues;
            await this.nftService.setTokenId(
              parseInt(returnValues.id),
              event.address,
              event.chainId,
              event.transactionHash,
            );
            break;
          }
        }
        break;
      }
    }
  }
}
