import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NftsFilter {
  @Field({ nullable: true })
  creatorEthAddress?: string;

  @Field({ nullable: true })
  licenseOwnerEthAddress?: string;

  @Field({ nullable: true })
  masterOwnerEthAddress?: string;

  @Field({ nullable: true })
  hasSelling?: boolean;
}
