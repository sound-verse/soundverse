import { Field, Float, GraphQLTimestamp, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../../user/dto/output/user.output';
import { NftType } from '../../../common/enums/nftType.enum';
import { SellingStatus } from '../../../common/enums/sellingStatus.enum';
import { NftOwner } from '../../../nft/dto/output/nft.output';

@ObjectType()
class SaleVoucher {
  @Field()
  nftContractAddress: string;

  @Field()
  price: string;

  @Field()
  tokenUri: string;

  @Field(() => Int)
  supply: number;

  @Field()
  isMaster: boolean;

  @Field()
  signature: string;

  @Field()
  currency: string;

  @Field()
  validUntil: number;
}

@ObjectType()
class MintVoucher {
  @Field()
  price: string;

  @Field()
  tokenUri: string;

  @Field(() => Int)
  supply: number;

  @Field(() => Int)
  maxSupply: number;

  @Field()
  isMaster: boolean;

  @Field()
  signature: string;

  @Field()
  currency: string;

  @Field(() => Int)
  royaltyFeeMaster: number;

  @Field(() => Int)
  royaltyFeeLicense: number;

  @Field(() => Int)
  creatorOwnerSplit: number;

  @Field()
  validUntil: number;
}

@ObjectType()
export class Selling {
  @Field()
  id: string;

  @Field()
  seller: User;

  @Field(() => [NftOwner])
  buyers?: [NftOwner];

  @Field({ nullable: true })
  saleVoucher?: SaleVoucher;

  @Field({ nullable: true })
  mintVoucher?: MintVoucher;

  @Field()
  nftType: NftType;

  @Field()
  marketplaceContractAddress: string;

  @Field()
  sellingStatus: SellingStatus;

  @Field({ nullable: true })
  transactionHash?: string;
}
