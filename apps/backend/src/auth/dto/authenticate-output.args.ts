import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthenticateOutput {
  @Field()
  valid: boolean;
}
