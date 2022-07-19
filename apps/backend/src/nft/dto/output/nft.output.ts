import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../../graphql/types/base-model.types';
import { Selling } from '../../../selling/dto/output/selling.output';
import { User } from '../../../user/dto/output/user.output';

@ObjectType()
export class NftOwner {
  @Field()
  user: User;

  @Field()
  supply: number;
}

@ObjectType()
export class NftSelling {
  @Field(() => Selling, { nullable: true })
  masterSelling?: Selling;

  @Field(() => [Selling], { nullable: true })
  licenseSellings?: Selling[];
}

@ObjectType()
export class NftMetadata {
  @Field()
  name: string;

  @Field()
  description: string;
}

@ObjectType()
export class Nft extends BaseModel {
  @Field({ nullable: true })
  tokenId?: number;

  @Field()
  supply: number;

  @Field()
  masterContractAddress: string;

  @Field()
  licenseContractAddress: string;

  @Field()
  ipfsUrl: string;

  @Field()
  fileUrl: string;

  @Field()
  trackDuration: number;

  @Field(() => [Float])
  soundWave: [number];

  @Field(() => Int)
  chainId: number;

  @Field()
  filePictureUrl: string;

  @Field({ nullable: true })
  transactionHash?: string;

  @Field()
  metadata: NftMetadata;

  @Field()
  royaltyFeeMaster: number;

  @Field()
  royaltyFeeLicense: number;

  @Field()
  creatorOwnerSplit: number;

  @Field({ nullable: true })
  creator?: User;

  @Field(() => [NftOwner], { nullable: true })
  licenseOwners?: NftOwner[];

  @Field(() => NftOwner)
  masterOwner: NftOwner;

  @Field(() => NftSelling, { nullable: true })
  sellings?: NftSelling;
}
