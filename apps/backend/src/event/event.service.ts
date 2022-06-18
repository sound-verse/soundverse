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
        }
        break;
      }
      case ContractType.MARKETPLACE: {
        switch (eventType) {
          case EventType.UNLISTED_NFT: {
            const args = event.args;
            const voucherSignature: string = args[0];
            await this.sellingService.unlistSelling(voucherSignature);
            break;
          }
          case EventType.REDEEMED_MINT_VOUCHER: {
            const args = event.args;
            const voucherSignature: string = args[0];
            const buyer: string = args[1];
            const soldAmount: number = BigNumber.from(args[2]).toNumber();
            await this.nftService.changeOwner(
              voucherSignature,
              buyer,
              soldAmount,
              event.chainId,
              event.transactionHash,
              'mint_voucher',
            );
            break;
          }
          case EventType.REDEEMED_SALE_VOUCHER: {
            const args = event.args;
            const voucherSignature: string = args[0];
            const buyer: string = args[1];
            const soldAmount: number = BigNumber.from(args[2]).toNumber();
            await this.nftService.changeOwner(
              voucherSignature,
              buyer,
              soldAmount,
              event.chainId,
              event.transactionHash,
              'sale_voucher',
            );
            break;
          }
        }
        break;
      }
    }
  }
}
