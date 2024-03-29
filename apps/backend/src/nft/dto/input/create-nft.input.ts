import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Max, MaxLength } from 'class-validator';
import xss from 'xss';

@InputType()
export class NftMetadataInput {
  @Field()
  @Transform(({ value }) => xss(value))
  @MaxLength(100, {
    message: 'Name is too long',
  })
  name: string;

  @Field({ nullable: true })
  @Transform(({ value }) => xss(value))
  @MaxLength(1000, {
    message: 'Description is too long',
  })
  description?: string;
}

@InputType()
export class NftInput {
  @Field()
  metadata: NftMetadataInput;

  @Field()
  supply: number;

  @Field(() => [String])
  tags: string[];

  @Field(() => Int)
  @Max(10000)
  royaltyFeeMaster: number;

  @Field(() => Int)
  @Max(10000)
  royaltyFeeLicense: number;

  @Field(() => Int)
  @Max(10000)
  creatorOwnerSplit: number;

  @Field({ nullable: true })
  transactionHash?: string;

  @Field({ nullable: true })
  chainId?: number;

  @Field(() => Float)
  trackDuration: number;

  @Field(() => Float)
  trackBPM: number;

  @Field()
  @Transform(({ value }) => xss(value))
  @MaxLength(100, {
    message: 'Genre is too long',
  })
  genre: string;

  @Field(()=>[Float])
  soundWave: [number];
}
