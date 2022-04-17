import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Nft } from './nft.output';

@ObjectType()
export class UserNfts {
  @Field(() => [Nft], { nullable: true })
  createdMasterNfts?: Nft[];

  @Field(() => [Nft], { nullable: true })
  createdLicenseNfts?: Nft[];

  @Field(() => [Nft], { nullable: true })
  ownedMasterNfts?: Nft[];

  @Field(() => [Nft], { nullable: true })
  ownedLicenseNfts?: Nft[];
}
