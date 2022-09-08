import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Expose } from 'class-transformer';
import { BaseDBObject } from '../BaseDBObject';
import { Room } from '../room/dto/output/room.output';

export type UserDocument = User & Document<Types.ObjectId>;

@Schema()
export class User extends BaseDBObject {
  constructor(partial: Partial<User> = {}) {
    super();
    Object.assign(this, partial);
  }

  @Prop()
  email?: string;

  @Prop({ required: true })
  nonce?: number;

  @Prop({ required: true, lowercase: true })
  ethAddress: string;

  @Prop()
  description?: string;

  @Prop()
  name?: string;

  @Prop()
  twitter?: string;

  @Prop()
  instagram?: string;

  @Prop()
  soundcloud?: string;

  @Prop()
  discord?: string;

  @Prop()
  spotify?: string;

  @Prop()
  website?: string;

  @Prop()
  profileImage?: string;

  @Prop({ type: Types.ObjectId, ref: Room.name })
  joinedRommId?: Types.ObjectId;

  @Prop({ required: true, default: false })
  verified?: boolean;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  following: [Types.ObjectId];

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  followers: [Types.ObjectId];

  @Prop()
  active?: boolean;

  @Prop({ default: () => Date.now() })
  createdAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ ethAddress: 1 });
