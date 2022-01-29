import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { ListenerService } from './listener.service';

@Module({
  imports: [CoreModule],
  providers: [ListenerService],
  exports: [ListenerService],
})
export class ListenerModule {}
