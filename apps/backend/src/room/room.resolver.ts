import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { Nft } from '../nft/nft.schema';
import { NftService } from '../nft/nft.service';
import { CurrentUser, LoggedinUser } from '../user/decorators/user.decorator';
import { User } from '../user/dto/output/user.output';
import { UserService } from '../user/user.service';
import { CreateRoomInput } from './dto/input/create-room.input';
import { RoomFilter } from './dto/input/room-filter.input';
import { Room } from './dto/output/room.output';
import { Rooms } from './dto/output/rooms.output';
import { RoomService } from './room.service';
import { Types } from 'mongoose';
import { PlaylistItem } from './room.schema';
import { Room as RoomSchema } from './room.schema';
import { JoinRoomInput } from './dto/input/join-room.input';
import { User as UserSchema } from '../user/user.schema';
import { LeaveRoomInput } from './dto/input/leave-room.input';
import { PUB_SUB } from '../core/pubSub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { valueFromAST } from 'graphql';
import { UpdateCurrentSongInput } from './dto/input/update-current-song.input';

export const ROOM_UPDATED_EVENT = 'roomUpdated';

@Resolver(() => Room)
export class RoomResolver {
  constructor(
    private roomService: RoomService,
    private userService: UserService,
    private nftService: NftService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Room)
  async createRoom(
    @CurrentUser() user: LoggedinUser,
    @Args('createRoomInput') createRoomInput: CreateRoomInput,
  ) {
    const newRoom = await this.roomService.createRoom(createRoomInput, user);
    return newRoom;
  }

  @Query(() => Room)
  async room(@Args('roomFilter') roomFilter: RoomFilter) {
    const room = await this.roomService.getRoom(roomFilter);
    return room;
  }

  @Query(() => Rooms)
  async rooms() {
    const activeRooms = await this.roomService.getActiveRooms();
    return { rooms: activeRooms };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Room)
  async reviveRoom(@CurrentUser() user: UserSchema) {
    const room = await this.roomService.getRoomByCreator(user);
    if (!room) {
      return;
    }
    const revivedRoom = await this.roomService.reviveRoom(room);
    return revivedRoom;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Room)
  async nextSong(@CurrentUser() user: UserSchema) {
    const room = await this.roomService.playNextSong(user);
    return room;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Room)
  async prevSong(@CurrentUser() user: UserSchema) {
    const room = await this.roomService.playPreviousSong(user);
    return room;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Room)
  async updateCurrentSong(
    @CurrentUser() user: UserSchema,
    @Args('updateCurrentSongInput') updateCurrentSongInput: UpdateCurrentSongInput,
  ) {
    const room = await this.roomService.updateCurrentSong(user, updateCurrentSongInput);
    return room;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Room)
  async joinRoom(@CurrentUser() user: UserSchema, @Args('joinRoomInput') joinRoomInput: JoinRoomInput) {
    const room = await this.roomService.addUserToRoom(user, joinRoomInput);
    await this.pubSub.publish(ROOM_UPDATED_EVENT, { roomUpdated: room });
    return room;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Room)
  async leaveRoom(@CurrentUser() user: UserSchema, @Args('leaveRoomInput') leaveRoomInput: LeaveRoomInput) {
    const room = await this.roomService.removeUserFromRoom(user, leaveRoomInput);
    await this.pubSub.publish(ROOM_UPDATED_EVENT, { roomUpdated: room });
    return room;
  }

  @Subscription(() => Room, {
    filter: (payload, variables) => {
      return payload?.roomUpdated?._id && payload.roomUpdated._id === variables?.roomId;
    },
    resolve: async function (this: RoomResolver, value) {
      const room = await this.roomService.getPopulatedRoom(value.roomUpdated);
      return room;
    },
  })
  roomUpdated(@Args('roomId') roomId: string) {
    return this.pubSub.asyncIterator(ROOM_UPDATED_EVENT);
  }

  @ResolveField(() => User)
  async creator(@Parent() room: Room) {
    return await this.userService.findUserById(room.creator._id);
  }

  @ResolveField(() => User)
  async activeUsers(@Parent() room: Room) {
    return await this.userService.findUserByIds(room.activeUsers.map((user) => user._id));
  }

  @ResolveField(() => PlaylistItem)
  async currentTrack(@Parent() room: RoomSchema) {
    if (!room.currentTrack?.nft) {
      return {};
    }
    return {
      ...room.currentTrack,
      nft: await this.nftService.findNft({ id: room.currentTrack.nft._id.toString() }),
    };
  }

  @ResolveField(() => [PlaylistItem])
  async playlistItems(@Parent() room: RoomSchema) {
    const nfts = await this.nftService.getByIds(
      room.playlistItems.map((nft) => new Types.ObjectId(nft.nft._id)),
    );

    const playlistItems = room.playlistItems.map((item) => ({
      ...item,
      nft: nfts.find((nft) => nft._id.toString() === item.nft._id.toString()),
    }));

    return playlistItems;
  }
}
