import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NftSearchInput {
    @Field({ nullable: true })
    search?: string;    
}