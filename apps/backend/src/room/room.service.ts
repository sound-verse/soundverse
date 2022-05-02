import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from './room.schema';
import { Types, Model } from 'mongoose';
import { CreateRoomInput } from './dto/input/create-room.input';
import { User } from '../user/user.schema';
import { NftService } from '../nft/nft.service';
import { RoomFilter } from './dto/input/room-filter.input';
import { JoinRoomInput } from './dto/input/join-room.input';
import { LeaveRoomInput } from './dto/input/leave-room.input';
import { Room as RoomOutput } from './dto/output/room.output';
import { UserService } from '../user/user.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    private nftService: NftService,
    private userService: UserService,
  ) {}

  async createRoom(createRoomInput: CreateRoomInput, user: User): Promise<Room> {
    const nftIds = createRoomInput.playlistItems.map((playlistItem) => playlistItem.nftId);
    const nfts = await this.nftService.getByIds(nftIds);

    const nftCheck = nfts.filter(
      (nft) => nft._id.toString() !== nftIds.find((nftId) => nft._id.toString() === nftId),
    );

    if (nftCheck.length > 0) {
      throw new BadRequestException('Error selecting the playlist');
    }

    const playlistItems = createRoomInput.playlistItems.map((item) => ({
      nft: new Types.ObjectId(item.nftId),
      nftType: item.nftType,
    }));

    const newRoom = await this.roomModel.create({
      creator: user._id,
      playlistItems,
      active: true,
    });

    return newRoom;
  }

  async getActiveRooms() {
    const rooms = await this.roomModel.find({ active: true });
    return rooms;
  }

  async getRoom(roomFilter: RoomFilter) {
    const searchObject = {
      ...(roomFilter.id && { _id: new Types.ObjectId(roomFilter.id) }),
      ...(roomFilter.creatorId && { creator: roomFilter.creatorId }),
    };

    return await this.roomModel.findOne({ searchObject });
  }

  async addUserToRoom(user: User, joinRoomInput: JoinRoomInput) {
    await this.removeUserFromRoom(user, { roomId: joinRoomInput.roomId });
    const room = await this.roomModel.findOneAndUpdate(
      { _id: joinRoomInput.roomId, creator: { $ne: user._id } },
      { $addToSet: { activeUsers: user._id } },
    );
    return room ?? (await this.getRoom({ id: joinRoomInput.roomId }));
  }

  async removeUserFromRoom(user: User, leaveRoomInput: LeaveRoomInput) {
    const room = this.roomModel.findOneAndUpdate(
      { _id: leaveRoomInput.roomId },
      { $pull: { activeUsers: user._id } },
    );
    return room;
  }

  async getPopulatedRoom(room: Room): Promise<RoomOutput> {
    //TODO: This needs to be way more performant for the PubSub soution! Aggregation? Write everything upfront in Rooms Schema?

    if (!room?._id) {
      return;
    }

    console.log('ROOOOOOM', room);
    const creator = await this.userService.findUserById(room.creator.toString());
    const activeUsers = await this.userService.findUserByIds(room.activeUsers.map((user) => user.toString()));
    const currentTrackNft =
      room.currentTrack && (await this.nftService.findNft({ id: room.currentTrack.nft.toString() }));
    const nfts = await this.nftService.getByIds(
      room.playlistItems.map((nft) => new Types.ObjectId(nft.nft.toString())),
    );

    const playlistItems = room.playlistItems.map((item) => ({
      ...item,
      nft: nfts.find((nft) => nft._id.toString() === item.nft.toString()),
    }));

    const populatedRoom = {
      ...room,
      id: room._id.toString(),
      creator,
      // activeUsers,
      // ...(currentTrackNft && {
      //   currentTrack: {
      //     ...room.currentTrack,
      //     nft: { ...currentTrackNft, id: currentTrackNft?._id?.toString() ?? '' },
      //   },
      // }),
      // playlistItems,
    };

    return populatedRoom as any;
  }
}
