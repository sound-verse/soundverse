import { Field, InputType } from '@nestjs/graphql';

@InputType()
class SellingVoucherInput {
  @Field()
  nftContractAddress: string;

  @Field()
  price: number;

  @Field()
  sellCount: number;

  @Field()
  tokenUri: string;

  @Field()
  tokenId: number;

  @Field()
  supply: number;

  @Field()
  isMaster: boolean;

  @Field()
  signature: string;
}

@InputType()
export class CreateSellingInput {
  @Field()
  sellingVoucher: SellingVoucherInput;
}
