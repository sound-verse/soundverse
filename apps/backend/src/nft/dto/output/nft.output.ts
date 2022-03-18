import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../../user/dto/output/user.output';

@ObjectType()
export class NftOwner {
  @Field()
  user: User;

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
  id: string;

  @Field({ nullable: true })
  tokenId?: number;

  @Field()
  supply: number;

  @Field()
  contractAddress: string;

  @Field()
  ipfsUrl: string;

  @Field()
  fileUrl: string;

  @Field((type) => Int)
  chainId: number;

  @Field()
  filePictureUrl: string;

  @Field({ nullable: true })
  transactionHash?: string;

  @Field()
  metadata: NftMetadata;

  @Field({ nullable: true })
  creator?: User;

  @Field((type) => [NftOwner], { nullable: true })
  licenseOwners?: NftOwner[];

  @Field((type) => NftOwner)
  masterOwner: NftOwner;
}
