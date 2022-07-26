import { Module } from '@nestjs/common';
import { IPFSService } from './ipfs.service';
import { CoreModule } from '../core/core.module';
import { HttpModule } from '@nestjs/axios';
import {FileModule} from '../file/file.module'

@Module({
  imports: [CoreModule, HttpModule, FileModule],
  providers: [IPFSService],
  exports: [IPFSService],
})
export class IPFSModule {}
