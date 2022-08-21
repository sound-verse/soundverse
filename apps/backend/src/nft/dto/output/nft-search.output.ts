import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../../../user/dto/output/user.output";
import { Nft } from "./nft.output";

@ObjectType()
export class NftSearch {
    @Field(() => [Nft], {nullable: true})
    nfts?: Nft[];

    @Field(() => [User], {nullable: true})
    artists?: User[];
}