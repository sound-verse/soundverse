import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NftFilter {
  @Field({ nullable: true })
  contractAddress?: string;

  @Field({ nullable: true })
  tokenId?: number;

  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  ipfsUrl?: string;
}
