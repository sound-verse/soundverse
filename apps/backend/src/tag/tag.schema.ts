import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Expose } from 'class-transformer';
import { BaseDBObject } from '../BaseDBObject';

export type TagDocument = Tag & Document<Types.ObjectId>;

@Schema()
export class Tag extends BaseDBObject {
  constructor(partial: Partial<Tag> = {}) {
    super();
    Object.assign(this, partial);
  }

  @Expose()
  @Prop({ required: true, lowercase: true })
  name: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);

TagSchema.index({ name: 1 }, { unique: true });
