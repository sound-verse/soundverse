import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCurrentSongInput {
  @Field(() => Float)
  currentPosition: number;
}
