import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NftResolver } from './nft.resolver';
import { Nft, NftSchema } from './nft.schema';
import { NftService } from './nft.service';
import { S3Service } from '../file/s3.service';
import { CoreModule } from '../core/core.module';
import { IPFSModule } from '../ipfs/ifps.module';
import { FileService } from '../file/file.service';
import { UserModule } from '../user/user.module';
import { TagModule } from '../tag/tag.module';
import { SellingModule } from '../selling/selling.module';
import { User, UserSchema } from '../user/user.schema';
import { Selling, SellingSchema } from '../selling/selling.schema';
import { NftHistoryModule } from '../nft-history/nft-history.module';

@Module({
  imports: [
    forwardRef(() => SellingModule),
    IPFSModule,
    CoreModule,
    MongooseModule.forFeature([{ name: Nft.name, schema: NftSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Selling.name, schema: SellingSchema }]),
    UserModule,
    TagModule,
    NftHistoryModule,
  ],
  providers: [NftResolver, NftService, FileService, S3Service],
  exports: [NftService],
})
export class NftModule {}
