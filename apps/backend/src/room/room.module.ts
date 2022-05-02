import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomResolver } from './room.resolver';
import { Room, RoomSchema } from './room.schema';
import { RoomService } from './room.service';
import { NftModule } from '../nft/nft.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [NftModule, UserModule, MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])],
  providers: [RoomResolver, RoomService],
  exports: [RoomService],
})
export class RoomModule {}
