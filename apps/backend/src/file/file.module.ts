import { Module } from '@nestjs/common';
import { IPFSService } from './file.service';
import { CoreModule } from '../core/core.module';
import { S3Service } from './s3.service';

@Module({
  imports: [CoreModule],
  providers: [IPFSService, S3Service],
  exports: [IPFSService, S3Service],
})
export class IPFSModule {}
