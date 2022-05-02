import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class LeaveRoomInput {
  @Field()
  roomId: string;
}
