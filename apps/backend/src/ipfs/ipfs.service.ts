import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import pinataSDK from '@pinata/sdk';
import FormData from 'form-data';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosResponse } from 'axios';
import { AxiosRequestConfig } from 'axios';
import { CreateNftMetadata } from '../nft/nft.service';
import ipfsHasher from 'ipfs-only-hash';

export interface IPFSResult {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  isDuplicate: boolean;
}

@Injectable()
export class IPFSService {
  pinata;
  pinata_api_key;
  pinata_secret_api_key;
  constructor(private configService: ConfigService, private httpService: HttpService) {
    this.pinata_api_key = this.configService.get<string>('PINATA_API_Key');
    this.pinata_secret_api_key = this.configService.get<string>('PINATA_API_Secret');
    this.pinata = pinataSDK(this.pinata_api_key, this.pinata_secret_api_key);
  }

  async uploadFile(file: any, filename: string): Promise<IPFSResult> {
    const data = new FormData();
    data.append('file', file, { filename: filename });

    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
      maxBodyLength: Infinity,
      headers: {
        pinata_api_key: this.pinata_api_key,
        pinata_secret_api_key: this.pinata_secret_api_key,
        ...data.getHeaders(),
      },
      data,
    };

    let response: AxiosResponse<any>;
    try {
      response = await axios(config);
    } catch (e) {
      throw new BadRequestException();
    }

    const ipfsResult: IPFSResult = response.data;
    return ipfsResult;
  }

  async uploadJson(file: CreateNftMetadata, filename: string): Promise<IPFSResult> {
    const data = {
      pinataMetadata: {
        name: filename,
      },
      pinataContent: {
        ...file,
      },
    };

    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      headers: {
        pinata_api_key: this.pinata_api_key,
        pinata_secret_api_key: this.pinata_secret_api_key,
      },
      data,
    };

    let response: AxiosResponse<any>;
    try {
      response = await axios(config);
    } catch (e) {
      throw new BadRequestException('Name already taken');
    }

    const ipfsResult: IPFSResult = response.data;
    return ipfsResult;
  }

  async getHashFromString(content: string): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await ipfsHasher.of(content);
  }

  async unPinAll() {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: 'https://api.pinata.cloud/pinning/pinJobs?status=searching&sort=DESC',
      headers: {
        pinata_api_key: this.pinata_api_key,
        pinata_secret_api_key: this.pinata_secret_api_key,
      },
    };

    let response: AxiosResponse<any>;
    try {
      response = await axios(config);

      console.log(response.data);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async storeNFTonIPFS(awsReadStream, rndFileName, nftData) {
    //For local development, we dont actually create an IPFS file for now
    if (this.configService.get('ENVIRONMENT') === 'local') {
      const ipfsMetadata = { isDuplicate: false, IpfsHash: '' };
      return {
        ipfsMetadata,
        ipfsMetadataUrl: '',
        metadata: { ...nftData.metadata },
      };
    }

    const ipfsFile = await this.uploadFile(awsReadStream, rndFileName);
    const ipfsFileUrl = `ipfs://${ipfsFile.IpfsHash}`;

    //There will be two ways to access the NFT, either with the pre hash or the metadata hash
    const metadataPreHash = await this.getHashFromString(
      JSON.stringify({
        ...nftData.metadata,
        image: ipfsFileUrl,
      }),
    );

    const metadata = {
      ...nftData.metadata,
      image: ipfsFileUrl,
      external_url: `${this.configService.get('METADATA_EXTERNAL_URL_BASE')}/${this.configService.get(
        'ERC721_CONTRACT_ADDRESS',
      )}/${metadataPreHash}`,
    };

    const ipfsMetadata = await this.uploadJson(metadata, ipfsFile.IpfsHash);

    const ipfsMetadataUrl = `${this.configService.get('IPFS_GATEWAY_URL')}/${ipfsMetadata.IpfsHash}`;

    return {
      ipfsMetadata,
      ipfsMetadataUrl,
      metadata,
    };
  }
}
