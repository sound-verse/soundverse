import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  ethAddress: string;

  @Field()
  @IsNotEmpty()
  signature: string;
}
