import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { BaseDBObject } from '../BaseDBObject';
import { NftType } from '../common/enums/nftType.enum';
import { Nft } from '../nft/nft.schema';
import { User } from '../user/user.schema';

export type RoomDocument = Room & Document<Types.ObjectId>;

export class PlaylistItem {
  @Prop()
  nft: Nft;

  @Prop()
  nftType: NftType;

  @Prop({ default: 0 })
  currentPosition?: number;

  @Prop({ default: () => Date.now() })
  updatedAt: Date;
}

export class ChatMessage {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  sender: Types.ObjectId;

  @Prop()
  message: string;

  @Prop({ default: () => Date.now() })
  createdAt: Date;
}

@Schema()
export class Room extends BaseDBObject {
  constructor(partial: Partial<Room> = {}) {
    super();
    Object.assign(this, partial);
  }

  @Prop()
  creator?: User;

  @Prop(() => [PlaylistItem])
  playlistItems?: PlaylistItem[];

  @Prop(() => PlaylistItem)
  currentTrack?: PlaylistItem;

  @Prop()
  activeUsers?: User[];

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: () => Date.now() })
  createdAt: Date;

  @Prop({ default: () => Date.now() })
  updatedAt: Date;

  @Prop()
  chat?: ChatMessage[];

  @Prop({ default: false })
  isMasterRoom: boolean;

  @Prop({ default: "Soundverse" })
  name: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

RoomSchema.index({ active: 1 });
