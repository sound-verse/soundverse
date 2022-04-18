import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser, LoggedinUser } from '../user/decorators/user.decorator';
import { CreateRoomInput } from './dto/input/create-room.input';
import { RoomFilter } from './dto/input/room-filter.input';
import { Room } from './dto/output/room.output';
import { Rooms } from './dto/output/rooms.output';
import { RoomService } from './room.service';

@Resolver(() => Room)
export class RoomResolver {
  constructor(private roomService: RoomService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Room)
  async createRoom(
    @CurrentUser() user: LoggedinUser,
    @Args('createRoomInput') createRoomInput: CreateRoomInput,
  ) {
    return this.roomService.createRoom(createRoomInput, user);
  }

  @Query(() => Room)
  async room(@Args('roomFilter') roomFilter: RoomFilter) {
    return await this.roomService.getRoom(roomFilter);
  }

  @Query(() => Rooms)
  async rooms() {
    return await this.roomService.getActiveRooms();
  }
}
