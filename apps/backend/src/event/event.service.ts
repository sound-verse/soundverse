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
import { BigNumber } from 'ethers';

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
      setup: async (channel: amqp.ConfirmChannel) => {
        // tslint:disable-next-line:await-promise
        // tslint:disable-next-line:no-misused-promises
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
            const args = event.args;
            const tokenId: number = BigNumber.from(args[0]).toNumber();
            const tokenUri: string = args[1];
            await this.nftService.setTokenId(
              tokenId,
              event.address,
              event.chainId,
              event.transactionHash,
              tokenUri,
            );
            break;
          }
          case EventType.REDEEMED_ITEM: {
            const args = event.args;
            const from: string = args[0];
            const to: string = args[1];
            const tokenUri: string = args[2];
            const supply: number = BigNumber.from(args[3]).toNumber();
            const price: number = BigNumber.from(args[4]).toNumber();
            if (from === nullAddress) {
              return;
            }
            await this.nftService.changeOwner(
              from,
              to,
              supply,
              event.address,
              tokenUri,
              true,
              event.chainId,
              event.transactionHash,
              'mint_voucher',
            );
          }
          case EventType.REDEEMED_ITEM_SECONDARY_SALE: {
            const args = event.args;
            const from: string = args[0];
            const to: string = args[1];
            const tokenUri: string = args[2];
            const supply: number = BigNumber.from(args[3]).toNumber();
            const price: number = BigNumber.from(args[4]).toNumber();
            if (from === nullAddress) {
              return;
            }
            await this.nftService.changeOwner(
              from,
              to,
              supply,
              event.address,
              tokenUri,
              true,
              event.chainId,
              event.transactionHash,
              'sale_voucher',
            );
          }
        }
        break;
      }
      case ContractType.LICENSE: {
        switch (eventType) {
          case EventType.REDEEMED_ITEM: {
            const args = event.args;
            const from: string = args[1];
            const to: string = args[2];
            const tokenUri: string = args[3];
            const supply: number = BigNumber.from(args[4]).toNumber();
            if (from === nullAddress) {
              return;
            }
            await this.nftService.changeOwner(
              from,
              to,
              supply,
              event.address,
              tokenUri,
              false,
              event.chainId,
              event.transactionHash,
              'mint_voucher',
            );
          }
          case EventType.REDEEMED_ITEM_SECONDARY_SALE: {
            const args = event.args;
            const from: string = args[1];
            const to: string = args[2];
            const tokenUri: string = args[3];
            const supply: number = BigNumber.from(args[4]).toNumber();
            if (from === nullAddress) {
              return;
            }
            await this.nftService.changeOwner(
              from,
              to,
              supply,
              event.address,
              tokenUri,
              false,
              event.chainId,
              event.transactionHash,
              'sale_voucher',
            );
          }
        }
        break;
      }
      case ContractType.MARKETPLACE: {
        switch (eventType) {
          case EventType.UNLISTED_NFT: {
            const args = event.args;
            const tokenUri: string = args[0];
            const contractAddress: string = args[1];
            const caller: string = args[2];
            await this.sellingService.unlistSelling(caller, tokenUri, contractAddress);
          }
        }
      }
    }
  }
}
