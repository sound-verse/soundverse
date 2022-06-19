import { Field, GraphQLTimestamp, InputType, Int } from '@nestjs/graphql';

@InputType()
export class MintVoucherInput {
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
export class CreateMintSellingInput {
  @Field()
  nftId: string;

  @Field()
  mintVoucherInput: MintVoucherInput;
}
