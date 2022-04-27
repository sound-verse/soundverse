import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { BaseDBObject } from '../BaseDBObject';
import { Nft } from '../nft/nft.schema';
import { User } from '../user/user.schema';

export type RoomDocument = Room & Document<Types.ObjectId>;

export class CurrentTrack {
  @Prop({ type: [{ type: Types.ObjectId, ref: Nft.name }] })
  @Type(() => Nft)
  nft: Nft;

  @Prop()
  currentPosition: number;
}

@Schema()
export class Room extends BaseDBObject {
  constructor(partial: Partial<Room> = {}) {
    super();
    Object.assign(this, partial);
  }

  @Prop({ type: Types.ObjectId, ref: User.name })
  @Type(() => User)
  creator: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: Nft.name }] })
  @Type(() => Nft)
  playlist: [Nft];

  @Prop()
  currentTrack?: CurrentTrack;

  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  @Type(() => User)
  activeUsers?: User[];

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: () => Date.now() })
  createdAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

RoomSchema.index({ active: 1 });
