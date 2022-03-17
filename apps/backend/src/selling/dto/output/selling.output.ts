import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../../user/dto/output/user.output';
import { NftType } from '../../../common/enums/nftType.enum';
import { SellingStatus } from '../../../common/enums/sellingStatus.enum';

@ObjectType()
export class Buyer {
  @Field()
  user: User;

  @Field((type) => Int)
  supply: number;
}

@ObjectType()
class SellingVoucher {
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

@ObjectType()
export class Selling {
  @Field()
  id: string;

  @Field()
  seller: User;

  @Field((type) => [Buyer])
  buyers?: [Buyer];

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
