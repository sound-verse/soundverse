import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../user/dto/output/user.output';

@ObjectType()
export class NftOwner {
  @Field()
  ethAddress: string;

  @Field()
  supply: number;
}

@ObjectType()
export class NftMetadata {
  @Field()
  name: string;

  @Field()
  description: string;
}

@ObjectType()
export class Nft {
  @Field()
  tokenId: number;

  @Field()
  contractAddress: string;

  @Field()
  ipfsUrl: string;

  @Field()
  fileUrl: string;

  @Field({ nullable: true })
  filePictureUrl?: string;

  @Field({ nullable: true })
  transactionHash?: string;

  @Field()
  metadata: NftMetadata;

  @Field({ nullable: true })
  creator?: User;

  @Field((type) => [NftOwner], { nullable: true })
  owners?: NftOwner[];
}
