import { Field, InputType, Int, Float } from '@nestjs/graphql';

@InputType()
class SellingVoucherInput {
  @Field()
  nftContractAddress: string;

  @Field()
  price: string;

  @Field((type) => Int)
  sellCount: number;

  @Field()
  tokenUri: string;

  @Field((type) => Int)
  tokenId: number;

  @Field((type) => Int)
  supply: number;

  @Field((type) => Int)
  maxSupply: number;

  @Field()
  isMaster: boolean;

  @Field()
  signature: string;

  @Field()
  currency: string;

  @Field((type) => Int)
  royaltyFeeInBips: number;
}

@InputType()
export class CreateSellingInput {
  @Field()
  nftId: string;

  @Field()
  sellingVoucher: SellingVoucherInput;
}
