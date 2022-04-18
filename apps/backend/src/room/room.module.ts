import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NftModule } from '../nft/nft.module';
import { RoomResolver } from './room.resolver';
import { Room, RoomSchema } from './room.schema';
import { RoomService } from './room.service';

@Module({
  imports: [NftModule, MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])],
  providers: [RoomResolver, RoomService],
  exports: [RoomService],
})
export class RoomModule {}
