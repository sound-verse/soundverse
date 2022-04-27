import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
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

@Resolver(() => Room)
export class RoomResolver {
  constructor(
    private roomService: RoomService,
    private userService: UserService,
    private nftService: NftService,
  ) {}

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
    const activeRooms = await this.roomService.getActiveRooms();
    return { rooms: activeRooms };
  }

  @ResolveField(() => User)
  async creator(@Parent() room: Room) {
    return await this.userService.findUserById(room.creator._id);
  }

  @ResolveField(() => [Nft])
  async playlist(@Parent() room: Room) {
    return await this.nftService.getByIds(room.playlist.map((nft) => new Types.ObjectId(nft.id)));
  }
}
