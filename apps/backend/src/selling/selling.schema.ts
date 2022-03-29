import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseDBObject } from '../BaseDBObject';
import { SellingStatus } from '../common/enums/sellingStatus.enum';
import { NftType } from '../common/enums/nftType.enum';

export type SellingDocument = Selling & Document<Types.ObjectId>;

class Buyer {
  @Prop({ type: Types.ObjectId })
  user: Types.ObjectId;

  @Prop({ min: 1 })
  supply: number;

  @Prop()
  transactionHash: string;
}

class SellingVoucher {
  @Prop()
  nftContractAddress: string;

  @Prop()
  price: number;

  @Prop()
  sellCount: number;

  @Prop()
  tokenUri: string;

  @Prop()
  tokenId: number;

  @Prop()
  supply: number;

  @Prop()
  maxSupply: number;

  @Prop()
  isMaster: boolean;

  @Prop()
  signature: string;

  @Prop()
  currency: string;
}

@Schema()
export class Selling extends BaseDBObject {
  constructor(partial: Partial<Selling> = {}) {
    super();
    Object.assign(this, partial);
  }

  @Prop({ type: Types.ObjectId, ref: 'User' })
  seller: Types.ObjectId;

  @Prop({ default: [] })
  buyers?: [Buyer];

  @Prop({ type: Types.ObjectId, ref: 'Nft' })
  nft: Types.ObjectId;

  @Prop()
  sellingVoucher: SellingVoucher;

  @Prop()
  nftType: NftType;

  @Prop()
  marketplaceContractAddress: string;

  @Prop({ default: () => Date.now() })
  createdAt: Date;

  @Prop({ nullable: true })
  boughtAt?: Date;

  @Prop({ default: () => SellingStatus.OPEN })
  sellingStatus: SellingStatus;
}

export const SellingSchema = SchemaFactory.createForClass(Selling);

SellingSchema.index({ createdAt: 1 });
SellingSchema.index({ nft: 1 });
SellingSchema.index({ nft: 1, sellingStatus: 1, nftType: 1 });
SellingSchema.index({
  'sellingVoucher.nftContractAddress': 1,
  'sellingVoucher.tokenId': 1,
  'sellingVoucher.price': -1,
  'sellingVoucher.isMaster': 1,
  sellingStatus: 1,
});
