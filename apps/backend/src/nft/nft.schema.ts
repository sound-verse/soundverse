import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseDBObject } from '../BaseDBObject';

export type NftDocument = Nft & Document<Types.ObjectId>;

export class NftOwner {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ min: 0, default: 0 })
  supply: number;
}

class NftMetadata {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  external_url: string;
}

@Schema()
export class Nft extends BaseDBObject {
  constructor(partial: Partial<Nft> = {}) {
    super();
    Object.assign(this, partial);
  }

  @Prop({ type: Types.ObjectId, ref: 'User' })
  creator: Types.ObjectId;

  @Prop({ nullable: true })
  tokenId?: number;

  @Prop({ lowercase: true })
  masterContractAddress: string;

  @Prop({ lowercase: true })
  licenseContractAddress: string;

  @Prop({ default: [] })
  metadata: NftMetadata;

  @Prop()
  masterOwner: NftOwner;

  @Prop({ default: [] })
  licenseOwners: [NftOwner];

  @Prop({ default: true })
  active: boolean;

  @Prop()
  supply?: number;

  @Prop({ default: false })
  verified?: boolean;

  @Prop()
  transactionHash?: string;

  @Prop()
  chainId?: number;

  @Prop()
  ipfsUrl: string;

  @Prop()
  fileUrl: string;

  @Prop()
  trackDuration: number;

  @Prop()
  soundWave: [number];

  @Prop()
  filePictureUrl: string;

  @Prop()
  royaltyFeeMaster: number;

  @Prop()
  royaltyFeeLicense: number;

  @Prop()
  creatorOwnerSplit: number;

  @Prop({ type: [Types.ObjectId], ref: 'Tag' })
  tags: [Types.ObjectId];

  @Prop({ default: () => Date.now() })
  createdAt?: Date;
}

export const NftSchema = SchemaFactory.createForClass(Nft);

NftSchema.index({ tokenId: -1 });
NftSchema.index({ tokenId: 1, contractAddress: 1 });
