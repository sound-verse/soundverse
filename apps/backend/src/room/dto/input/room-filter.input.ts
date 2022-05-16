import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RoomFilter {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  creatorId?: string;

  @Field({ nullable: true })
  isMasterRoom?: boolean;
}
