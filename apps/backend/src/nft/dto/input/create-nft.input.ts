import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import xss from 'xss';

@InputType()
export class NftMetadataInput {
  @Field()
  @Transform(({ value }) => xss(value))
  name: string;

  @Field()
  @Transform(({ value }) => xss(value))
  description: string;
}

@InputType()
export class NftInput {
  @Field()
  metadata: NftMetadataInput;

  @Field()
  supply: number;

  @Field(() => [String])
  tags: string[];

  @Field({ nullable: true })
  transactionHash?: string;

  @Field({ nullable: true })
  chainId?: number;
}
