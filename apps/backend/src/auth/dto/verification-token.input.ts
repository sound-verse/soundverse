import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class VerificationTokenInput {
  @Field()
  ethAddress: string;
}
