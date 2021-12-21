import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NftFilter {
  @Field()
  contractAddress: string;

  @Field()
  tokenId: number;
}
