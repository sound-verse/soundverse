import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { MaxLength } from 'class-validator';
import xss from 'xss';
import { NftType } from '../../../common/enums/nftType.enum';

@InputType()
class PlaylistItemInput {
  @Field()
  nftId: string;

  @Field()
  nftType: NftType;
}

@InputType()
export class CreateRoomInput {
  @Field(() => [PlaylistItemInput])
  playlistItems: PlaylistItemInput[];

  @MaxLength(30, {
    message: 'Room name is too long.',
  })
  @Transform(({ value }) => xss(value))
  @Field()
  name: string;
}
