import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import pinataSDK from '@pinata/sdk';
import fs from 'fs';
import { Readable } from 'stream';

@Injectable()
export class IPFSService {
  pinata;
  constructor(private configService: ConfigService) {
    this.pinata = pinataSDK(
      configService.get<string>('PINATA_API_Key'),
      configService.get<string>('PINATA_API_Secret'),
    );
  }

  async testPinata(file: any) {
    const readableStreamForFile = file;
    const options = {
      pinataMetadata: {
        name: 'testfile',
        keyvalues: {
          customKey: 'customValue',
          customKey2: 'customValue2',
        },
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };

    let result;
    try {
      result = await this.pinata.pinFileToIPFS(readableStreamForFile, options);
    } catch (error) {
      console.log(error);
    }

    console.log(result);
  }
}
