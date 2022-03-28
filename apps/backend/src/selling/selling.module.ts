import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SellingResolver } from './selling.resolver';
import { Selling, SellingSchema } from './selling.schema';
import { SellingService } from './selling.service';
import { CoreModule } from '../core/core.module';
import { UserModule } from '../user/user.module';
import { NftModule } from '../nft/nft.module';
import { Nft, NftSchema } from '../nft/nft.schema';
import { User, UserSchema } from '../user/user.schema';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forFeature([{ name: Selling.name, schema: SellingSchema }]),
    MongooseModule.forFeature([{ name: Nft.name, schema: NftSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    forwardRef(() => NftModule),
  ],
  providers: [SellingResolver, SellingService],
  exports: [SellingService],
})
export class SellingModule {}
