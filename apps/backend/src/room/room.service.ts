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
import { Interval } from '@nestjs/schedule';
import { PUB_SUB } from '../core/pubSub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ROOM_UPDATED_EVENT } from './room.resolver';
import { UpdateCurrentSongInput } from './dto/input/update-current-song.input';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    private nftService: NftService,
    private userService: UserService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
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

    await this.closeRoom(user);

    await this.roomModel.create({
      creator: user._id,
      playlistItems,
      active: true,
    });

    const newRoom = await this.playNextSong(user);

    return newRoom;
  }

  async playNextSong(user: User) {
    const room = await this.getRoomByCreator(user);
    const songIndex = room.playlistItems.findIndex((item) => {
      return (
        item.nft._id.toString() === room.currentTrack?.nft._id.toString() &&
        item.nftType === room.currentTrack?.nftType
      );
    });

    let currentTrack;

    if (songIndex === -1) {
      currentTrack = room.playlistItems[0];
    } else if (songIndex + 1 === room.playlistItems.length) {
      currentTrack = room.playlistItems[0];
    } else {
      currentTrack = room.playlistItems[songIndex + 1];
    }

    const updatedRoom = await this.roomModel.findOneAndUpdate(
      { _id: room._id },
      { $set: { currentTrack } },
      { new: true },
    );

    return updatedRoom;
  }

  async playPreviousSong(user: User) {
    const room = await this.getRoomByCreator(user);
    const songIndex = room.playlistItems.findIndex(
      (item) =>
        item.nft._id.toString() === room.currentTrack?.nft._id.toString() &&
        item.nftType === room.currentTrack?.nftType,
    );

    let currentTrack;

    if (songIndex === -1) {
      currentTrack = room.playlistItems[room.playlistItems.length - 1];
    } else if (songIndex === 0) {
      currentTrack = room.playlistItems[room.playlistItems.length - 1];
    } else {
      currentTrack = room.playlistItems[songIndex - 1];
    }

    const updatedRoom = await this.roomModel.findOneAndUpdate(
      { _id: room._id },
      { $set: { currentTrack } },
      { new: true },
    );

    return updatedRoom;
  }

  async updateCurrentSong(user: User, updateCurrentSongInput: UpdateCurrentSongInput) {
    const room = await this.getRoomByCreator(user);
    if (!room) {
      return;
    }
    const updatedRoom = await this.roomModel.findOneAndUpdate(
      { _id: room._id },
      { $set: { 'currentTrack.currentPosition': updateCurrentSongInput.currentPosition } },
      { new: true },
    );

    await this.pubSub.publish(ROOM_UPDATED_EVENT, { roomUpdated: updatedRoom });

    return updatedRoom;
  }

  async closeRoom(user?: User, ids?: (string | Types.ObjectId)[]) {
    const findFilter = user ? { creator: user._id } : { _id: { $in: ids } };
    await this.roomModel.updateMany(findFilter, {
      $set: { active: false, activeUsers: [] },
    });
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
    return await this.roomModel.findOne({ ...searchObject, active: true });
  }

  async getRoomByCreator(user: User) {
    return await this.roomModel.findOne({ creator: user._id, active: true });
  }

  async reviveRoom(room: Room) {
    return await this.roomModel.findOneAndUpdate(
      { _id: room._id },
      { $set: { updatedAt: Date.now() } },
      { new: true },
    );
  }

  async addUserToRoom(user: User, joinRoomInput: JoinRoomInput) {
    await this.removeUserFromRoom(user, { roomId: joinRoomInput.roomId });
    const room = await this.roomModel.findOneAndUpdate(
      { _id: joinRoomInput.roomId, creator: { $ne: user._id } },
      { $addToSet: { activeUsers: user._id } },
      { new: true },
    );
    return room ?? (await this.getRoom({ id: joinRoomInput.roomId }));
  }

  async removeUserFromRoom(user: User, leaveRoomInput: LeaveRoomInput) {
    const room = this.roomModel.findOneAndUpdate(
      { _id: leaveRoomInput.roomId },
      { $pull: { activeUsers: user._id } },
      { new: true },
    );
    return room;
  }

  async getPopulatedRoom(room: Room): Promise<RoomOutput> {
    //TODO: This needs to be way more performant for the PubSub soution! Aggregation? Write everything upfront in Rooms Schema?

    if (!room?._id) {
      return;
    }

    const creator = await this.userService.findUserById(room.creator.toString());
    const activeUsers = await this.userService.findUserByIds(room.activeUsers.map((user) => user.toString()));
    const currentTrackNft =
      room.currentTrack && (await this.nftService.findNft({ id: room.currentTrack.nft.toString() }));
    const nfts = await this.nftService.getByIds(
      room.playlistItems.map((nft) => {
        return nft.nft.toString();
      }),
    );

    const playlistItems = room.playlistItems.map((item) => ({
      ...item,
      nft: nfts.find((nft) => nft._id.toString() === item.nft.toString()),
    }));

    const populatedRoom = {
      ...room,
      id: room._id.toString(),
      creator,
      activeUsers,
      ...(currentTrackNft && {
        currentTrack: {
          ...room.currentTrack,
          nft: { ...currentTrackNft, id: currentTrackNft?._id?.toString() ?? '' },
        },
      }),
      playlistItems,
    };

    return populatedRoom as any;
  }

  @Interval(5 * 60 * 1000)
  async removeDeadRooms() {
    const expirationTime = 5 * 60 * 1000; // 5 Minutes
    const expiredRooms = await this.roomModel.find({
      updatedAt: { $lt: new Date(Date.now() - expirationTime) },
    });

    const expiredRoomsIds = expiredRooms.map((room) => room._id);
    await this.closeRoom(undefined, expiredRoomsIds);

    await Promise.all(
      expiredRooms.map(async (room) => {
        await this.pubSub.publish(ROOM_UPDATED_EVENT, { roomUpdated: room });
      }),
    );

    // console.log(updatedRooms);
  }
}
