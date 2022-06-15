import { Field, InputType, Int, Float, GraphQLTimestamp } from '@nestjs/graphql';

@InputType()
export class SaleVoucherInput {
  @Field()
  nftContractAddress: string;

  @Field()
  price: string;

  @Field(() => Int)
  supply: number;

  @Field()
  isMaster: boolean;

  @Field()
  signature: string;

  @Field()
  currency: string;

  @Field(() => GraphQLTimestamp)
  validUntil: Date;
}

@InputType()
export class CreateSellingInput {
  @Field()
  nftId: string;

  @Field()
  saleVoucherInput?: SaleVoucherInput;
}
