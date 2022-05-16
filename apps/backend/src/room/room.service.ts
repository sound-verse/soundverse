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
import { CreateChatMessageInput } from './dto/input/create-chat-message.input';

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
      nft: nfts.find((nft) => nft._id.toString() === item.nftId),
      nftType: item.nftType,
    }));

    await this.closeRoom(user);

    const room = await this.roomModel.create({
      creator: user,
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
    const findFilter = user ? { 'creator._id': user._id } : { _id: { $in: ids } };
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
    return await this.roomModel.findOne({ 'creator._id': user._id, active: true });
  }

  async getRoomBySubscriber(user: User) {
    return await this.roomModel.findOne({
      $or: [{ 'activeUsers._id': user._id }, { 'creator._id': user._id }],
      active: true,
    });
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
      { _id: joinRoomInput.roomId, 'creator._id': { $ne: user._id }, active: true },
      { $addToSet: { activeUsers: user } },
      { new: true },
    );
    return room ?? (await this.getRoom({ id: joinRoomInput.roomId }));
  }

  async removeUserFromRoom(user: User, leaveRoomInput: LeaveRoomInput) {
    const room = this.roomModel.findOneAndUpdate(
      { _id: leaveRoomInput.roomId },
      { $pull: { activeUsers: { _id: user._id } } },
      { new: true },
    );
    return room;
  }

  async createChatMessage(user: User, createChatMessageInput: CreateChatMessageInput) {
    const room = await this.getRoomBySubscriber(user);

    if (!room) {
      return;
    }
    if (room._id.toString() !== createChatMessageInput.roomId) {
      throw new BadRequestException('User has not joined channel');
    }

    if (room.chat.length >= 100) {
      await this.roomModel.updateOne({ _id: room._id }, { $pop: { chat: -1 } });
    }
    return await this.roomModel.findOneAndUpdate(
      { _id: room._id },
      { $addToSet: { chat: { sender: user, message: createChatMessageInput.message } } },
    );
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
  }
}
