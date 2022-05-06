import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.output';

@ObjectType()
export class AuthUser extends User {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  joinedRoomId?: string;
}
