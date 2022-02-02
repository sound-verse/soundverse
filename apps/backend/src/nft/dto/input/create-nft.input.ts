import { Field, InputType } from '@nestjs/graphql';
// import xss from 'xss';
// import { Transform } from 'class-transformer';

@InputType()
export class NftMetadataInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [String]) tags: string[];
}

@InputType()
export class NftInput {
  @Field()
  metadata: NftMetadataInput;

  @Field()
  supply: number;
}
