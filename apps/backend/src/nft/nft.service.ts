import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Nft, NftDocument } from './nft.schema';
import { User } from '../user/user.schema';
import { TagService } from '../tag/tag.service';

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
  tags: string[];
}

@Injectable()
export class NftService {
  constructor(
    @InjectModel(Nft.name) private nftModel: Model<NftDocument>,
    private configService: ConfigService,
    private tagService: TagService,
  ) {}

  async createNft(createNftInput: CreateNftInput): Promise<Nft> {
    const nftTagsObjectIds = await this.handleTags(createNftInput);

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
        tags: nftTagsObjectIds,
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

  async handleTags(createNftInput: CreateNftInput): Promise<Types.ObjectId[]> {
    const nftTagsObjectIds = await Promise.all(
      createNftInput.tags.map(async (tag) => {
        const tagDocument = await this.tagService.findByName(tag);
        if (!tagDocument) {
          const newTagDocument = await this.tagService.create({ name: tag });
          return newTagDocument._id;
        } else {
          return tagDocument._id;
        }
      }),
    );
    return nftTagsObjectIds;
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
