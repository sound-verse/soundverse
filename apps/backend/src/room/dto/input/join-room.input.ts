import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class JoinRoomInput {
  @Field()
  roomId: string;
}
