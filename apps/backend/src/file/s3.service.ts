import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  s3;

  constructor(private configService: ConfigService) {
    const spacesEndpoint = new AWS.Endpoint(this.configService.get('DO_SPACES_ENDPOINT'));
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get('DO_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('DO_SECRET_ACCESS_KEY'),
      endpoint: spacesEndpoint,
      s3ForcePathStyle: true,
    });
  }

  async uploadFile(file, fileName, bucketName, overrides) {
    let params = {
      Bucket: bucketName,
      Key: String(fileName),
      Body: file,
      ACL: 'public-read',
      ContentDisposition: 'inline',
    };

    if (overrides) {
      params = { ...params, ...overrides };
    }
    try {
      await this.s3.upload(params, { partSize: 5 * 1024 * 1024, queueSize: 10 }).promise();
    } catch (error) {
      console.log(error);
    }

    return `${this.configService.get<string>('INTERNAL_FILE_URL_BASE_NFT')}/${fileName}`;
  }

  getFileReadStream(bucket, key) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.s3.getObject({ Bucket: bucket, Key: key }).createReadStream();
  }
}
