import { Module } from '@nestjs/common';
import { IPFSService } from './ipfs.service';
import { CoreModule } from '../core/core.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [CoreModule, HttpModule],
  providers: [IPFSService],
  exports: [IPFSService],
})
export class IPFSModule {}
