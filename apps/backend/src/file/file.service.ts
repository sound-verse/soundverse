import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import FileType from 'file-type';
import { ReadStream } from 'fs';
import { Stream } from 'stream';
import { S3Service } from './s3.service';

@Injectable()
export class FileService {
  constructor(private configService: ConfigService, private s3Service: S3Service) {}

  async uploadFileToBucket(fileName, bucket, createReadStream): Promise<string> {
    const writeStream = new Stream.PassThrough();
    const fileTypeStream = await FileType.stream(createReadStream());

    const uploadFile = this.s3Service.uploadFile(writeStream, fileName, bucket, {
      ACL: 'public-read',
      ContentType: fileTypeStream.fileType.mime,
    });

    await new Promise(
      (resolve, reject) =>
        void fileTypeStream
          .pipe(writeStream)
          .on('finish', () => resolve(true))
          .on('error', (e) => reject(e)),
    );

    return await uploadFile;
  }

  getAWSReadStream(bucket, fileName): ReadStream {
    const awsReadStream: ReadStream = this.s3Service.getFileReadStream(bucket, fileName);
    return awsReadStream;
  }
}
