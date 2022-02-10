import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NftsFilter {
  @Field()
  creatorEthAddress: string;
}
