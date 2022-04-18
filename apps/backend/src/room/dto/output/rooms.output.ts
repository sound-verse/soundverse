import { Field, ObjectType } from '@nestjs/graphql';
import { Room } from './room.output';

@ObjectType()
export class Rooms {
  @Field(() => [Room], { nullable: true })
  rooms?: Room[];
}
