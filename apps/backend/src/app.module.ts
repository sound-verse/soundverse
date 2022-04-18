import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CoreModule } from './core/core.module';
import { GraphqlModule } from './graphql/graphql.module';
import { AuthModule } from './auth/auth.module';
import { IPFSModule } from './ipfs/ifps.module';
import { NftModule } from './nft/nft.module';
import { EventModule } from './event/event.module';
import { TagModule } from './tag/tag.module';
import { SellingModule } from './selling/selling.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    CoreModule,
    GraphqlModule,
    UserModule,
    AuthModule,
    IPFSModule,
    NftModule,
    EventModule,
    TagModule,
    SellingModule,
    RoomModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
