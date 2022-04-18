import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from './room.schema';
import { Types, Model } from 'mongoose';
import { CreateRoomInput } from './dto/input/create-room.input';
import { User } from '../user/user.schema';
import { NftService } from '../nft/nft.service';
import { RoomFilter } from './dto/input/room-filter.input';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    private nftService: NftService,
  ) {}

  async createRoom(createRoomInput: CreateRoomInput, user: User) {
    const playlist = await this.nftService.getByIds(createRoomInput.nftIds);
    const newRoom = await this.roomModel.create({
      creator: user._id,
      playlist,
      active: true,
    });

    return newRoom;
  }

  async getActiveRooms() {
    return await this.roomModel.find({ active: true });
  }

  async getRoom(roomFilter: RoomFilter) {
    const searchObject = {
      ...(roomFilter.id && { _id: roomFilter.id }),
      ...(roomFilter.creatorId && { creator: roomFilter.creatorId }),
    };

    return await this.roomModel.findOne({ searchObject });
  }
}
