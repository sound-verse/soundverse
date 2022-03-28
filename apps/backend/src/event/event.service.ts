import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {
  ContractType,
  IMasterMintEvent,
  EventType,
  IEventMessage,
  ITransfer,
  ITransferSingle,
  IUnlistedNFT,
} from '@soundverse/shared-rpc-listener-service';
import * as amqp from 'amqplib';
import * as amqpConMgr from 'amqp-connection-manager';
import { NftService } from '../nft/nft.service';
import { ConfigService } from '@nestjs/config';
import { SellingService } from '../selling/selling.service';

@Injectable()
export class EventService implements OnApplicationBootstrap {
  constructor(
    private nftService: NftService,
    private configService: ConfigService,
    private sellingService: SellingService,
  ) {}

  onApplicationBootstrap() {
    const connection = amqpConMgr.connect({
      url: `amqp://${this.configService.get('RABBITMQ_USER')}:${this.configService.get(
        'RABBITMQ_PASSWORD',
      )}@${this.configService.get('RABBITMQ_HOST')}`,
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
      case ContractType.MASTER: {
        switch (eventType) {
          case EventType.MASTER_MINT_EVENT: {
            const returnValues: IMasterMintEvent = event.returnValues;
            await this.nftService.setTokenId(
              parseInt(returnValues.id),
              event.address,
              event.chainId,
              event.transactionHash,
              returnValues.uri,
            );
            break;
          }
          case EventType.TRANSFER: {
            const returnValues: ITransfer = event.returnValues;
            if (returnValues.from === nullAddress) {
              return;
            }
            await this.nftService.changeOwner(
              returnValues.from,
              returnValues.to,
              1,
              event.address,
              parseInt(returnValues.tokenId),
              true,
              event.chainId,
              event.transactionHash,
            );
          }
        }
        break;
      }
      case ContractType.LICENSE: {
        switch (eventType) {
          case EventType.TRANSFER_SINGLE: {
            const returnValues: ITransferSingle = event.returnValues;
            if (returnValues.from === nullAddress) {
              return;
            }
            await this.nftService.changeOwner(
              returnValues.from,
              returnValues.to,
              parseInt(returnValues.value),
              event.address,
              parseInt(returnValues.id),
              false,
              event.chainId,
              event.transactionHash,
            );
          }
        }
        break;
      }
      case ContractType.MARKETPLACE: {
        switch (eventType) {
          case EventType.UNLISTED_NFT: {
            const returnValues: IUnlistedNFT = event.returnValues;
            await this.sellingService.unlistSelling('', returnValues.tokenUri, returnValues.contractAddress);
          }
        }
      }
    }
  }
}
