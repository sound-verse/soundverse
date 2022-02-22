import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Nft, NftDocument } from './nft.schema';
import { User } from '../user/user.schema';
import { TagService } from '../tag/tag.service';
import { UpdateTxInput } from './dto/input/update-tx-nft.input';
import { NftsFilter } from './dto/input/nfts-filter.input';
import { UserService } from '../user/user.service';

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
  transactionHash: string;
  chainId: number;
}

@Injectable()
export class NftService {
  userModel: any;
  constructor(
    @InjectModel(Nft.name) private nftModel: Model<NftDocument>,
    private configService: ConfigService,
    private tagService: TagService,
    private userService: UserService,
  ) {}

  async createNft(createNftInput: CreateNftInput): Promise<Nft> {
    const nftTagsObjectIds = await this.handleTags(createNftInput);

    let ipfsUrl = createNftInput.ipfsUrl;

    if (this.configService.get<string>('ENVIRONMENT') === 'local') {
      ipfsUrl = createNftInput.fileUrl;
    }

    const newNft = await this.nftModel.findOneAndUpdate(
      { ipfsUrl, contractAddress: createNftInput.contractAddress.toLowerCase() },
      {
        verified: true, //we set all new NFTS to verfied, to prepare already for lazy minting
        metadata: createNftInput.metadata,
        contractAddress: createNftInput.contractAddress.toLowerCase(),
        ipfsUrl: createNftInput.ipfsUrl,
        fileUrl: createNftInput.fileUrl,
        filePictureUrl: createNftInput.filePictureUrl,
        creator: createNftInput.user,
        tags: nftTagsObjectIds,
        transactionHash: createNftInput.transactionHash ? createNftInput.transactionHash : '',
        chainId: createNftInput.chainId ? createNftInput.chainId : 0,
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

  async updateTxHash(txInput: UpdateTxInput): Promise<Nft> {
    return await this.nftModel.findOneAndUpdate(
      { _id: txInput.id, tokenId: null },
      { transactionHash: txInput.transactionHash },
      { new: true },
    );
  }

  async setTokenId(
    tokenId: number,
    contractAddress: string,
    chainId: number,
    transactionHash: string,
  ): Promise<void> {
    //TODO: workournd for race condition of transactionHashes -> will be solved with dead letter queue ticket
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await this.nftModel.updateOne(
      { contractAddress: contractAddress.toLowerCase(), chainId, transactionHash },
      {
        $set: {
          tokenId,
        },
      },
    );
  }

  async getNfts(limitOfDocuments = 100, documentsToSkip = 0, filter?: NftsFilter): Promise<Nft[]> {
    if (filter?.creatorEthAddress) {
      const creator = await this.userService.findByETHAddress(filter.creatorEthAddress.toLowerCase());
      if (!creator) {
        return null;
      }
      return this.nftModel.find({ verified: true, creator: creator._id, tokenId: { $exists: true } });
    }

    const findQuery = this.nftModel
      .find({ verified: true })
      .sort({ _id: 1 })
      .skip(documentsToSkip)
      .limit(limitOfDocuments);

    const results = await findQuery;
    return results;
  }
}
