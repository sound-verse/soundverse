import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nft, NftDocument } from './nft.schema';
import { User } from '../user/user.schema';

export interface CreateNftMetadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
}

export interface CreateNftInput {
  metadata: CreateNftMetadata;
  contractAddress: string;
  ipfsUrl: string;
  fileUrl: string;
  filePictureUrl: string;
  user: User;
  supply: number;
}

@Injectable()
export class NftService {
  constructor(
    @InjectModel(Nft.name) private nftModel: Model<NftDocument>,
    private configService: ConfigService,
  ) {}

  async createNft(createNftInput: CreateNftInput): Promise<Nft> {
    const nextNft = await this.nftModel
      .find({ contractAddress: createNftInput.contractAddress.toLowerCase() }, { tokenId: 1, _id: 0 })
      .sort({ tokenId: -1 })
      .limit(1);
    const nextId = nextNft[0] ? nextNft[0].tokenId + 1 : 1;

    let ipfsUrl = createNftInput.ipfsUrl;

    if (this.configService.get<string>('ENVIRONMENT') === 'local') {
      ipfsUrl = createNftInput.fileUrl;
    }

    const newNft = await this.nftModel.findOneAndUpdate(
      { ipfsUrl, contractAddress: createNftInput.contractAddress.toLowerCase() },
      {
        metadata: createNftInput.metadata,
        tokenId: nextId,
        contractAddress: createNftInput.contractAddress.toLowerCase(),
        ipfsUrl: createNftInput.ipfsUrl,
        fileUrl: createNftInput.fileUrl,
        filePictureUrl: createNftInput.filePictureUrl,
        creator: createNftInput.user,
        owners: [
          {
            ethAddress: createNftInput.user.ethAddress,
            supply: createNftInput.supply,
          },
        ],
      },
      {
        upsert: true,
        new: true,
      },
    );

    return newNft;
  }

  async findNft({ contractAddress, ipfsUrl, tokenId }: Partial<Nft>): Promise<Nft> {
    const searchObject = {
      contractAddress,
      ...(ipfsUrl && { ipfsUrl }),
      ...(tokenId && { tokenId }),
    };
    return await this.nftModel.findOne(searchObject);
  }

  async update(nftData: Partial<Nft>): Promise<Nft> {
    return await this.nftModel.findOneAndUpdate(
      { tokenId: nftData.tokenId, contractAddress: nftData.contractAddress.toLowerCase() },
      { ...nftData },
      { new: true },
    );
  }

  async verifyNft(tokenId: number, contractAddress: string): Promise<void> {
    await this.nftModel.updateOne(
      { tokenId, contractAddress: contractAddress.toLowerCase() },
      {
        $set: {
          verified: true,
        },
      },
    );
  }

  async getNfts(): Promise<Nft[]> {
    return this.nftModel.find({ verified: true });
  }
}
