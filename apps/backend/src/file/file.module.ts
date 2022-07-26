import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { CoreModule } from '../core/core.module';
import { S3Service } from './s3.service';

@Module({
  imports: [CoreModule],
  providers: [FileService, S3Service],
  exports: [FileService, S3Service],
})
export class FileModule {}
