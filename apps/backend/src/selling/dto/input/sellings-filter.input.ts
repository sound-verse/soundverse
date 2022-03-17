import { Field, InputType, Int } from '@nestjs/graphql';
import { NftType } from '../../../common/enums/nftType.enum';

@InputType()
export class SellingsFilter {
  @Field({ nullable: true })
  nftType?: NftType;

  @Field({ nullable: true })
  nftId?: string;

  @Field({ nullable: true })
  nftContractAddress?: string;

  @Field((type) => Int, { nullable: true })
  tokenId?: number;
}
