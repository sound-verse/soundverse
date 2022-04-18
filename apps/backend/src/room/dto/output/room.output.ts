import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Nft } from '../../../nft/dto/output/nft.output';
import { User } from '../../../user/dto/output/user.output';

@ObjectType()
export class CurrentTrack {
  @Field(() => Nft)
  nft: Nft;

  @Field(() => Int)
  currentPosition: number;
}

@ObjectType()
export class Room {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => [Nft])
  playlist: Nft[];

  @Field(() => CurrentTrack, { nullable: true })
  currentTrack?: CurrentTrack;

  @Field(() => [User], { nullable: true })
  activeUsers?: User[];

  @Field()
  active: boolean;

  @Field(() => User)
  creator: User;
}
