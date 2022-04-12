import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { NftModule } from '../nft/nft.module';
import { SellingModule } from '../selling/selling.module';

@Module({
  imports: [NftModule, SellingModule],
  providers: [EventService],
  exports: [EventService],
  controllers: [EventController],
})
export class EventModule {}
