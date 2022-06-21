import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from '../core/core.module';
import { NftHistory, NftHistorySchema } from './nft-history.schema';
import { NftHistoryService } from './nft-history.service';

@Module({
  imports: [CoreModule, MongooseModule.forFeature([{ name: NftHistory.name, schema: NftHistorySchema }])],
  providers: [NftHistoryService],
  exports: [NftHistoryService],
})
export class NftHistoryModule {}
