import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CoreModule } from './core/core.module';
import { GraphqlModule } from './graphql/graphql.module';
import { AuthModule } from './auth/auth.module';
import { IPFSModule } from './ipfs/ifps.module';
import { NftModule } from './nft/nft.module';
@Module({
  imports: [
    CoreModule,
    GraphqlModule,
    UserModule,
    AuthModule,
    IPFSModule,
    NftModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
