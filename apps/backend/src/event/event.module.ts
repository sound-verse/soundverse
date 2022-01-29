import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { NftModule } from '../nft/nft.module';

@Module({
  imports: [NftModule],
  providers: [EventService],
  exports: [EventService],
  controllers: [EventController],
})
export class EventModule {}
