import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ipfsHasher from 'ipfs-only-hash';
import { create } from 'ipfs-http-client';
import { ReadStream } from 'fs';
import { AddResult } from 'ipfs-core-types/src/root';
import crypto from 'crypto';

@Injectable()
export class IPFSService {
  constructor(private configService: ConfigService) {}

  async uploadFile(file: ReadStream, filename: string): Promise<AddResult> {
    const auth =
      'Basic ' +
      Buffer.from(
        `${this.configService.get('INFURA_PROJECT_ID')}:${this.configService.get('INFURA_PROJECT_SECRET')}`,
      ).toString('base64');

    const client = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth,
      },
    });

    let ipfsResult: AddResult;
    try {
      ipfsResult = await client.add({ path: filename, content: file });
    } catch (e) {
      throw new BadRequestException({ ...e, filename });
    }

    return ipfsResult;
  }

  async uploadJsonFile(jsonObjectString: string, filename: string): Promise<AddResult> {
    const auth =
      'Basic ' +
      Buffer.from(
        `${this.configService.get('INFURA_PROJECT_ID')}:${this.configService.get('INFURA_PROJECT_SECRET')}`,
      ).toString('base64');

    const client = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth,
      },
    });

    let ipfsResult;
    try {
      ipfsResult = await client.add({ path: filename, content: jsonObjectString });
    } catch (e) {
      throw new BadRequestException({ ...e, filename });
    }

    return ipfsResult;
  }

  async getHashFromString(content: string): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await ipfsHasher.of(content);
  }

  async storeNFTonIPFS(awsReadStreamImage, awsReadStreamAudio, rndFileNameAudio, nftData) {
    //For local development, we dont actually create an IPFS file for now
    if (this.configService.get('ENVIRONMENT') === 'local') {
      const ipfsMetadata = { isDuplicate: false, IpfsHash: '' };
      return {
        ipfsMetadata,
        ipfsMetadataUrl: `http://ipfs.local/${crypto.randomBytes(16).toString('hex')}`,
        metadata: { ...nftData.metadata },
      };
    }

    const ipfsFileAudio = await this.uploadFile(awsReadStreamAudio, rndFileNameAudio);
    const ipfsFileUrlAudio = `ipfs://${ipfsFileAudio.cid}`;

    const ipfsFileImage = await this.uploadFile(awsReadStreamImage, rndFileNameAudio);
    const ipfsFileUrlImage = `ipfs://${ipfsFileImage.cid}`;

    const preMetadata = {
      ...nftData.metadata,
      duration: nftData.trackDuration,
      ...(nftData.trackBpm > 0 && { bpm: nftData.trackBpm }),
      image: ipfsFileUrlImage,
      audio: ipfsFileUrlAudio,
    };
    //There will be two ways to access the NFT, either with the pre hash or the metadata hash
    const metadataPreHash = await this.getHashFromString(
      JSON.stringify({
        preMetadata,
      }),
    );

    const metadata = {
      ...preMetadata,
      external_url: `${this.configService.get('METADATA_EXTERNAL_URL_BASE')}/${metadataPreHash}`,
    };

    const ipfsMetadata = await this.uploadJsonFile(JSON.stringify(metadata), metadataPreHash);

    const ipfsMetadataUrl = `${this.configService.get('IPFS_GATEWAY_URL')}/${ipfsMetadata.cid}`;

    return {
      ipfsMetadata,
      ipfsMetadataUrl,
      metadata,
    };
  }
}
