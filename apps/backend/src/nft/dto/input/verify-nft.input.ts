import { Field, InputType } from '@nestjs/graphql';

@InputType()
class MintVoucher {
  @Field()
  tokenId: number;

  @Field()
  nftContractAddress: string;

  @Field()
  price: number;

  @Field()
  sellCount: number;

  @Field()
  tokenUri: string;

  @Field()
  supply: number;

  @Field()
  isMaster: boolean;

  @Field()
  signature?: string;
}

@InputType()
export class VerifyNftInput {
  @Field()
  id: string;

  @Field()
  mintVoucher: MintVoucher;
}
