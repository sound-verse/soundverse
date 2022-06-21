import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EventType } from '@soundverse/shared-rpc-listener-service';
import { Document, Types } from 'mongoose';
import { BaseDBObject } from '../BaseDBObject';

@Schema()
export class RPCHistory extends BaseDBObject {
  constructor(partial: Partial<RPCHistory> = {}) {
    super();
    Object.assign(this, partial);
  }

  @Prop()
  txHash: string;

  @Prop()
  eventType: EventType;

  @Prop()
  contractAddress: string;

  @Prop({ default: () => Date.now() })
  seenAt: Date;
}

export type RPCHistoryDocument = RPCHistory & Document<Types.ObjectId>;
export const RPCHistorySchema = SchemaFactory.createForClass(RPCHistory);

RPCHistorySchema.index({ seenAt: 1, contractAddress: 1, eventType: 1 });
