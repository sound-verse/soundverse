import { Field, InputType } from '@nestjs/graphql';
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

  @Field()
  name: string;
}
