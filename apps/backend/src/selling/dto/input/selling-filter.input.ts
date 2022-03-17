import { Field, InputType, Int } from '@nestjs/graphql';
import { NftType } from '../../../common/enums/nftType.enum';

@InputType()
export class SellingFilter {
  @Field({ nullable: true })
  nftType?: NftType;

  @Field({ nullable: true })
  nftContractAddress?: string;

  @Field((type) => Int, { nullable: true })
  tokenId?: number;
}
