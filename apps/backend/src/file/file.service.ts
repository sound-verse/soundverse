import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import FileType from 'file-type';
import { ReadStream } from 'fs';
import { Stream } from 'stream';
import { S3Service } from './s3.service';

const pictureFilenameStart = "cover";
const allowedPicturesRegEx = new RegExp("([a-zA-Z0-9\\s_\\.\\-\\(\\):])+(.jpg|.jpeg|.png|.gif)$");
const allowedMusicNftsRegEx = new RegExp("([a-zA-Z0-9\\s_\\.\\-\\(\\):])+(.mp3|.wave|.wav|.flac)$");
const maxAllowedFileSize = 1000000;

@Injectable()
export class FileService {
  constructor(private configService: ConfigService, private s3Service: S3Service) { }

  async uploadFileToBucket(fileName: string, bucket: string, createReadStream): Promise<string> {
    const writeStream = new Stream.PassThrough();
    const fileTypeStream = await FileType.stream(createReadStream());

    this.validateFileSize(fileName, fileTypeStream);
    this.validateFileToUpload(fileName, fileTypeStream);

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

  private async validateFileSize(fileName: string, fileTypeStream) {
    let byteLength = 0;
    for await (const uploadChunk of fileTypeStream) {
      byteLength += (uploadChunk as Buffer).byteLength;
      if (byteLength > maxAllowedFileSize) {
        throw new NotAcceptableException("File with name " + fileName + " is too large to upload. Maximum allowed filesize is " + maxAllowedFileSize / 10000 + "MB.");
      }
    }
    fileTypeStream.destroy();
  }

  private validateFileToUpload(fileName: string, fileTypeStream) {
    if (fileName.startsWith(pictureFilenameStart) && !fileTypeStream.fileType.mime.match(allowedPicturesRegEx)) {
      throw new NotAcceptableException('Picture file of type ' + fileTypeStream.fileType.mime + ' is not acceptable for this parameter.');
    } else if (!fileName.startsWith(pictureFilenameStart) && !fileTypeStream.fileType.mime.match(allowedMusicNftsRegEx)) {
      throw new NotAcceptableException('Music NFT file of type ' + fileTypeStream.fileType.mime + ' is not acceptable for this parameter.');
    }
  }

  getAWSReadStream(bucket: string, fileName: string): ReadStream {
    const awsReadStream: ReadStream = this.s3Service.getFileReadStream(bucket, fileName);
    return awsReadStream;
  }
}
