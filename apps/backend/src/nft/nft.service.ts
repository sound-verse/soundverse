import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Nft, NftDocument } from './nft.schema';
import { User } from '../user/user.schema';
import { TagService } from '../tag/tag.service';
import { VerifyNftInput } from './dto/input/verify-nft.input';
import { NftsFilter } from './dto/input/nfts-filter.input';
import { UserService } from '../user/user.service';
import * as sigUtil from '@metamask/eth-sig-util';
import { NftFilter } from './dto/input/nft-filter.input';
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
        verified: true,
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

  async findNft({ contractAddress, ipfsUrl, tokenId, id }: NftFilter): Promise<Nft> {
    const searchObject = {
      ...(contractAddress && { contractAddress }),
      ...(ipfsUrl && { ipfsUrl }),
      ...(tokenId && { tokenId }),
      ...(id && { _id: id }),
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

  async verifyNft(input: VerifyNftInput, ethAddress: string): Promise<Nft> {
    const mintVoucherTypes = {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      MINTVoucher: [
        { name: 'tokenId', type: 'uint256' },
        { name: 'nftContractAddress', type: 'address' },
        { name: 'price', type: 'uint256' },
        { name: 'sellCount', type: 'uint256' },
        { name: 'tokenUri', type: 'string' },
        { name: 'supply', type: 'uint256' },
        { name: 'isMaster', type: 'bool' },
      ],
    };

    const mintedNft = await this.nftModel.findOne({ _id: input.id });

    const address = sigUtil.recoverTypedSignature({
      data: {
        types: mintVoucherTypes,
        primaryType: 'MINTVoucher',
        domain: {
          name: 'SV-Voucher',
          version: '1',
          chainId: mintedNft.chainId,
          verifyingContract: this.configService.get('MARKET_CONTRACT_ADDRESS'),
        },
        message: {
          tokenId: input.mintVoucher.tokenId,
          nftContractAddress: input.mintVoucher.nftContractAddress,
          price: input.mintVoucher.price,
          sellCount: input.mintVoucher.sellCount,
          tokenUri: input.mintVoucher.tokenUri,
          supply: input.mintVoucher.supply,
          isMaster: input.mintVoucher.isMaster,
        },
      },
      signature: input.mintVoucher.signature,
      version: sigUtil.SignTypedDataVersion.V4,
    });

    if (address.toLowerCase() !== ethAddress.toLowerCase()) {
      throw new ForbiddenException('Signature invalid!');
    }
    return await this.nftModel.findOneAndUpdate({ _id: input.id }, { verified: true }, { new: true });
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
      return this.nftModel.find({ verified: true, creator: creator._id });
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
