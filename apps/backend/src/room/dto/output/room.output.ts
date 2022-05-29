import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { NftType } from '../../../common/enums/nftType.enum';
import { BaseModel } from '../../../graphql/types/base-model.types';
import { Nft } from '../../../nft/dto/output/nft.output';
import { User } from '../../../user/dto/output/user.output';

@ObjectType()
export class PlaylistItem {
  @Field(() => Nft, { nullable: true })
  nft?: Nft;

  @Field(() => NftType, { nullable: true })
  nftType?: NftType;

  @Field(() => Float, { nullable: true })
  currentPosition?: number;
}

@ObjectType()
export class ChatMessage {
  @Field(() => User)
  sender: User;

  @Field()
  message: string;
}

@ObjectType()
export class Room extends BaseModel {
  @Field(() => PlaylistItem, { nullable: true })
  currentTrack?: PlaylistItem;

  @Field(() => [PlaylistItem], { nullable: true })
  playlistItems?: PlaylistItem[];

  @Field(() => [User], { nullable: true })
  activeUsers?: User[];

  @Field()
  active: boolean;

  @Field(() => User, { nullable: true })
  creator?: User;

  @Field(() => [ChatMessage], { nullable: true })
  chat?: ChatMessage[];
}
