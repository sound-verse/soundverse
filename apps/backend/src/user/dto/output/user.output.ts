import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../../graphql/types/base-model.types';

@ObjectType()
export class User extends BaseModel {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  ethAddress?: string;

  @Field({ nullable: true })
  twitter?: string;

  @Field({ nullable: true })
  instagram?: string;

  @Field({ nullable: true })
  soundcloud?: string;

  @Field({ nullable: true })
  discord?: string;

  @Field({ nullable: true })
  spotify?: string;

  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  profileImage?: string;

  @Field(()=> [User], {nullable: true})
  followers?: User[]

  @Field(()=>[User], {nullable: true})
  following?: User[]

  @Field(() => Boolean, { nullable: true })
  verified?: boolean;
}
