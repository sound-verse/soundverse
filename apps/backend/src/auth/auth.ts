import { Field, ObjectType } from '@nestjs/graphql';
import { AuthUser } from '../user/dto/output/auth-user.output';

@ObjectType()
export class Auth {
  @Field({ description: 'JWT Bearer token' })
  token: string;

  @Field(() => AuthUser, { nullable: true })
  user?: AuthUser;
}
