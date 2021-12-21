import { Field, InputType } from '@nestjs/graphql';
// import xss from 'xss';
// import { Transform } from 'class-transformer';

@InputType()
export class UpdateTxInput {
  @Field()
  tokenId: number;

  @Field()
  contractAddress: string;

  @Field()
  transactionHash: string;
}
