import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NftsFilter {
  @Field({ nullable: true })
  creatorEthAddress?: string;

  @Field({ nullable: true })
  hasSelling?: boolean;
}
