import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

@ObjectType({ isAbstract: true })
export class BaseModel {
  @Field(() => String, { name: 'id' })
  @Transform(({ value }) => {
    console.log(value.toString());
    return value?.toString() as string;
  })
  _id: Types.ObjectId | string;
}
