import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Expose } from 'class-transformer';
import { BaseDBObject } from '../BaseDBObject';

export type UserDocument = User & Document<Types.ObjectId>;

@Schema()
export class User extends BaseDBObject {
  constructor(partial: Partial<User> = {}) {
    super();
    Object.assign(this, partial);
  }

  @Expose()
  @Prop()
  email?: string;

  @Prop({ required: true })
  nonce?: number;

  @Expose()
  @Prop({ required: true, unique: true, lowercase: true })
  ethAddress: string;

  @Expose()
  @Prop()
  description?: string;

  @Expose()
  @Prop()
  name?: string;

  @Expose()
  @Prop()
  twitter?: string;

  @Expose()
  @Prop()
  instagram?: string;

  @Expose()
  @Prop()
  website?: string;

  @Expose()
  @Prop()
  profileImage?: string;

  @Expose()
  @Prop({ required: true, default: false })
  verified?: boolean;

  @Prop()
  active?: boolean;

  @Prop({ default: () => Date.now() })
  createdAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ ethAddress: 1 });
