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
import { ChatMessage, Room } from './dto/output/room.output';
import { Rooms } from './dto/output/rooms.output';
import { RoomService } from './room.service';
import { JoinRoomInput } from './dto/input/join-room.input';
import { User as UserSchema } from '../user/user.schema';
import { LeaveRoomInput } from './dto/input/leave-room.input';
import { PUB_SUB } from '../core/pubSub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { valueFromAST } from 'graphql';
import { CreateChatMessageInput } from './dto/input/create-chat-message.input';
import { withCancel } from '../lib/withCancel';
import { GqlAuthGuardContinue } from '../auth/gql-auth-continue.guard';

export const ROOM_UPDATED_EVENT = 'roomUpdated';
export const ROOMS_UPDATED_EVENT = 'roomsUpdated';
export const TEST_EVENT = 'testEvent';

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
    const rooms = await this.roomService.getActiveRooms();
    await this.pubSub.publish(ROOMS_UPDATED_EVENT, { roomsUpdated: rooms });
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
  async joinRoom(@CurrentUser() user: UserSchema, @Args('joinRoomInput') joinRoomInput: JoinRoomInput) {
    const room = await this.roomService.addUserToRoom(user, joinRoomInput);
    await this.pubSub.publish(ROOM_UPDATED_EVENT, { roomUpdated: room });
    return room;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Room)
  async leaveRoom(@CurrentUser() user: UserSchema, @Args('leaveRoomInput') leaveRoomInput: LeaveRoomInput) {
    await this.roomService.removeUserFromRooms(user);
    const room = await this.roomService.getRoom({ id: leaveRoomInput.roomId });
    await this.pubSub.publish(ROOM_UPDATED_EVENT, { roomUpdated: room });
    return room;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Room)
  async createChatMessage(
    @CurrentUser() user: UserSchema,
    @Args('createChatMessageInput') createChatMessageInput: CreateChatMessageInput,
  ) {
    return await this.roomService.createChatMessage(user, createChatMessageInput);
  }

  @Subscription(() => [Room])
  roomsUpdated() {
    return this.pubSub.asyncIterator(ROOMS_UPDATED_EVENT);
  }

  @Subscription(() => Room, {
    filter: (payload, variables) => {
      return payload?.roomUpdated?._id.toString() === variables?.roomId;
    },
  })
  roomUpdated(@Args('roomId') roomId: string, @Args('userId', { nullable: true }) userId?: string) {
    if (!userId) {
      void this.roomService.addAnonymousUser(roomId);
    }
    return withCancel(this.pubSub.asyncIterator(ROOM_UPDATED_EVENT), () => {
      if (!userId) {
        void this.roomService.removeAnonymousUser(roomId);
      }
    });
  }

  @ResolveField(() => [ChatMessage])
  async chat(@Parent() room: Room) {
    return await Promise.all(
      room.chat.map((chatMassage) => {
        const sender = this.userService.findUserById(chatMassage.sender._id);
        return { ...chatMassage, sender };
      }),
    );
  }
}
