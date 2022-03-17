import { Field, InputType, Int, Float } from '@nestjs/graphql';

@InputType()
class SellingVoucherInput {
  @Field()
  nftContractAddress: string;

  @Field((type) => Float)
  price: number;

  @Field((type) => Int)
  sellCount: number;

  @Field()
  tokenUri: string;

  @Field((type) => Int)
  tokenId: number;

  @Field((type) => Int)
  supply: number;

  @Field()
  isMaster: boolean;

  @Field()
  signature: string;
}

@InputType()
export class CreateSellingInput {
  @Field()
  nftId: string;

  @Field()
  sellingVoucher: SellingVoucherInput;
}
