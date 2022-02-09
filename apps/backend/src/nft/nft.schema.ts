import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Expose } from 'class-transformer';
import { BaseDBObject } from '../BaseDBObject';
import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';
import { Tag } from '../tag/tag.schema';

export type NftDocument = Nft & Document<Types.ObjectId>;

class NftOwner {
  @Prop({ lowercase: true })
  ethAddress: string;

  @Prop({ min: 0, default: 0 })
  supply: number;
}

class NftMetadata {
  @Expose()
  @Prop()
  name: string;

  @Expose()
  @Prop()
  description: string;

  @Expose()
  @Prop()
  image: string;

  @Expose()
  @Prop()
  external_url: string;
}

@Schema()
export class Nft extends BaseDBObject {
  constructor(partial: Partial<Nft> = {}) {
    super();
    Object.assign(this, partial);
  }

  @Expose()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: mongoose.PopulatedDoc<User>;

  @Prop()
  @Expose()
  tokenId?: number;

  @Expose()
  @Prop({ lowercase: true })
  contractAddress: string;

  @Expose()
  @Prop({ default: [] })
  metadata: NftMetadata;

  @Prop({ default: [] })
  owners: [NftOwner];

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  verified?: boolean;

  @Prop()
  @Expose()
  transactionHash?: string;

  @Prop()
  @Expose()
  chainId?: number;

  @Prop()
  @Expose()
  ipfsUrl: string;

  @Prop()
  @Expose()
  fileUrl: string;

  @Prop()
  @Expose()
  filePictureUrl: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Tag' })
  @Expose()
  tags: mongoose.PopulatedDoc<Tag>[];

  @Prop({ default: () => Date.now() })
  createdAt?: Date;
}

export const NftSchema = SchemaFactory.createForClass(Nft);

NftSchema.index({ tokenId: -1 });
NftSchema.index({ tokenId: 1, contractAddress: 1 }, { unique: true });
