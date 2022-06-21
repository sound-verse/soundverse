import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EventType } from '@soundverse/shared-rpc-listener-service';
import { Document, Types } from 'mongoose';
import { BaseDBObject } from '../BaseDBObject';

export type NftHistoryDocument = NftHistory & Document<Types.ObjectId>;

@Schema()
export class NftHistory extends BaseDBObject {
  constructor(partial: Partial<NftHistory> = {}) {
    super();
    Object.assign(this, partial);
  }

  @Prop({ type: Types.ObjectId })
  nft: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  from: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  to?: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  selling?: Types.ObjectId;

  @Prop()
  eventType: EventType;

  @Prop()
  contractAddress: string;

  @Prop()
  transactionHash: string;

  @Prop({ default: () => Date.now() })
  createdAt?: Date;
}

export const NftHistorySchema = SchemaFactory.createForClass(NftHistory);

NftHistorySchema.index({ transactionHash: 1 });
NftHistorySchema.index({ nft: 1 });
NftHistorySchema.index({ transactionHash: 1, eventType: 1, contractAddress: 1 });
