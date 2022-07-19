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
import { ROOMS_UPDATED_EVENT, ROOM_UPDATED_EVENT } from './room.resolver';
import { CreateChatMessageInput } from './dto/input/create-chat-message.input';
import { SellingService } from '../selling/selling.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    private nftService: NftService,
    private sellingService: SellingService,
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

    const newRoom = await this.playNextSong(room);
    return newRoom;
  }

  async playNextSong(room: Room) {
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
      { $set: { currentTrack: { ...currentTrack, currentPosition: 0 } } },
      { new: true },
    );
    return updatedRoom;
  }

  async playPreviousSong(room: Room) {
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

  async createMasterRoom() {
    return await this.roomModel.findOneAndUpdate(
      {
        isMasterRoom: true,
      },
      { $set: { isMasterRoom: true } },
      { upsert: true, new: true },
    );
  }

  async getMasterRoom() {
    const room = await this.roomModel.findOne({ isMasterRoom: true });
    return room ? room : await this.createMasterRoom();
  }

  async closeRoom(user?: User, ids?: (string | Types.ObjectId)[]) {
    const findFilter = user ? { 'creator._id': user._id } : { _id: { $in: ids } };
    await this.roomModel.updateMany(findFilter, {
      $set: { active: false, activeUsers: [] },
    });
  }

  async getActiveRooms() {
    const rooms = await this.roomModel.find({ active: true, isMasterRoom: false });
    return rooms;
  }

  async getRoom(roomFilter: RoomFilter) {
    const searchObject = {
      ...(roomFilter.id && { _id: new Types.ObjectId(roomFilter.id) }),
      ...(roomFilter.creatorId && { creator: roomFilter.creatorId }),
    };
    if (roomFilter.isMasterRoom) {
      return await this.getMasterRoom();
    }
    return await this.roomModel.findOne({ ...searchObject, active: true });
  }

  async getRoomByCreator(user: User) {
    return await this.roomModel.findOne({ 'creator._id': user._id, active: true });
  }

  async userIsSubscribedToRoom(user: User) {
    const room = await this.roomModel.findOne({
      $or: [{ 'activeUsers._id': user._id }, { 'creator._id': user._id }],
      active: true,
    });

    return room ? true : false;
  }

  async reviveRoom(room: Room) {
    return await this.roomModel.findOneAndUpdate(
      { _id: room._id },
      { $set: { updatedAt: Date.now() } },
      { new: true },
    );
  }

  async updateCurrentSong(room: Room, secondsToAdd: number) {
    if (!room.playlistItems) {
      return;
    }
    let updatedRoom;

    if (room.currentTrack.currentPosition > room.currentTrack.nft.trackDuration) {
      updatedRoom = await this.playNextSong(room);
    } else {
      updatedRoom = await this.roomModel.findOneAndUpdate(
        { _id: room._id },
        { $set: { 'currentTrack.currentPosition': room.currentTrack.currentPosition + secondsToAdd } },
        { new: true },
      );
    }

    await this.pubSub.publish(ROOM_UPDATED_EVENT, { roomUpdated: updatedRoom });

    return updatedRoom;
  }

  async addUserToRoom(user: User, joinRoomInput: JoinRoomInput) {
    await this.removeUserFromRooms(user);
    const room = await this.roomModel.findOneAndUpdate(
      { _id: joinRoomInput.roomId, 'creator._id': { $ne: user._id }, active: true },
      { $addToSet: { activeUsers: user } },
      { new: true },
    );
    return room ?? (await this.getRoom({ id: joinRoomInput.roomId }));
  }

  async removeUserFromRooms(user: User) {
    await this.roomModel.updateMany(
      { 'activeUsers._id': user._id, active: true },
      { $pull: { activeUsers: { _id: user._id } } },
      { new: true },
    );
  }

  async createChatMessage(user: User, createChatMessageInput: CreateChatMessageInput) {
    let room;

    if (createChatMessageInput.roomId === '') {
      room = await this.getMasterRoom();
    } else {
      const userIsSubscribed = await this.userIsSubscribedToRoom(user);
      if (!userIsSubscribed) {
        throw new BadRequestException('User has not joined channel');
      }
      room = await this.getRoom({ id: createChatMessageInput.roomId });
      if (!room) {
        return;
      }
    }

    if (room.chat.length >= 100) {
      await this.roomModel.updateOne({ _id: room._id }, { $pop: { chat: -1 } });
    }
    const updatedRoom = await this.roomModel.findOneAndUpdate(
      { _id: room._id },
      { $addToSet: { chat: { sender: user, message: createChatMessageInput.message } } },
      { new: true },
    );

    await this.pubSub.publish(ROOM_UPDATED_EVENT, { roomUpdated: updatedRoom });

    return updatedRoom;
  }

  async populateRoom(room: Room): Promise<RoomOutput> {
    const playlistItemsWithSellings = await Promise.all(
      room.playlistItems.map((playlistItem) => {
        const sellings = this.sellingService.getNftSellingByNftId(new Types.ObjectId(playlistItem.nft._id));

        return {
          ...playlistItem,
          nft: {
            ...playlistItem.nft,
            sellings: sellings,
          },
        };
      }),
    );

    const currentTrackSelling = await this.sellingService.getNftSellingByNftId(
      new Types.ObjectId(room.currentTrack.nft._id),
    );

    return {
      ...room,
      playlistItems: playlistItemsWithSellings,
      currentTrack: {
        ...room.currentTrack,
        nft: {
          ...room.currentTrack.nft,
          sellings: currentTrackSelling,
        },
      },
    } as any;
  }

  @Interval(5 * 60 * 1000)
  async removeDeadRooms(): Promise<void> {
    const expirationTime = 5 * 60 * 1000; // 5 Minutes
    const expiredRooms = await this.roomModel.find({
      isMasterRoom: false,
      updatedAt: { $lt: new Date(Date.now() - expirationTime) },
    });

    const expiredRoomsIds = expiredRooms.map((room) => room._id);
    await this.closeRoom(undefined, expiredRoomsIds);

    await Promise.all(
      expiredRooms.map(async (room) => {
        await this.pubSub.publish(ROOM_UPDATED_EVENT, { roomUpdated: room });
      }),
    );

    const rooms = await this.getActiveRooms();
    await this.pubSub.publish(ROOMS_UPDATED_EVENT, { roomsUpdated: rooms });
  }

  @Interval(10 * 1000)
  async updateActiveRooms(): Promise<void> {
    const activeRooms = await this.roomModel.find({
      active: true,
    });

    await Promise.all(activeRooms.map((room) => this.updateCurrentSong(room, 10)));
  }
}
