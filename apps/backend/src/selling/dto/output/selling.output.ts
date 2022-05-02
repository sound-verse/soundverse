import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../../user/dto/output/user.output';
import { NftType } from '../../../common/enums/nftType.enum';
import { SellingStatus } from '../../../common/enums/sellingStatus.enum';
import { NftOwner } from '../../../nft/dto/output/nft.output';

@ObjectType()
class SellingVoucher {
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

  @Field()
  royaltyFeeInBips: number;
}

@ObjectType()
export class Selling {
  @Field()
  id: string;

  @Field()
  seller: User;

  @Field((type) => [NftOwner])
  buyers?: [NftOwner];

  @Field()
  sellingVoucher: SellingVoucher;

  @Field()
  nftType: NftType;

  @Field()
  marketplaceContractAddress: string;

  @Field()
  sellingStatus: SellingStatus;

  @Field({ nullable: true })
  transactionHash?: string;
}
