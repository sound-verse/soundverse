import { Injectable } from '@nestjs/common';
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

  async uploadFile(file, fileName: string, bucketName: string, overrides) {
    let params = {
      Bucket: bucketName,
      Key: fileName,
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

    return this.resolveBucketUrl(bucketName, fileName);
  }

  getFileReadStream(bucket: string, key: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.s3.getObject({ Bucket: bucket, Key: key }).createReadStream();
  }

  resolveBucketUrl(bucket: string, fileName: string): string {
    let bucketName;
    switch (bucket) {
      case 'soundverse-testflight-user':
      case 'soundverse-user-main':
      case 'soundverse-user': {
        bucketName = this.configService.get('ENVIRONMENT') === 'local' ? 'soundverse-user' : 'user';
        break;
      }
      case 'soundverse-testflight-nft':
      case 'soundverse-main-nft':
      case 'soundverse-nft': {
        bucketName = this.configService.get('ENVIRONMENT') === 'local' ? 'soundverse-nft' : 'nft';
        break;
      }
    }

    return `${this.configService
      .get<string>('INTERNAL_FILE_URL_BASE')
      .replace('{bucket}', bucketName)}/${fileName}`;
  }
}
