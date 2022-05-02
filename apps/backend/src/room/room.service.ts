import { BadRequestException, Injectable } from '@nestjs/common';
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
      ...(roomFilter.id && { _id: roomFilter.id }),
      ...(roomFilter.creatorId && { creator: roomFilter.creatorId }),
    };

    return await this.roomModel.findOne({ searchObject });
  }
}
