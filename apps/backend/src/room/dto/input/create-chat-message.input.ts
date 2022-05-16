import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Length } from 'class-validator';
import xss from 'xss';

@InputType()
export class CreateChatMessageInput {
  @Field()
  @Length(1, 250)
  @Transform(({ value }) => xss(value))
  message: string;

  @Field()
  roomId: string;
}
