import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Nft, NftDocument } from './nft.schema';
import { User, UserDocument } from '../user/user.schema';
import { TagService } from '../tag/tag.service';
import { NftsFilter } from './dto/input/nfts-filter.input';
import { UserService } from '../user/user.service';
import { NftFilter } from './dto/input/nft-filter.input';
import { Selling, SellingDocument } from '../selling/selling.schema';
import { NftType } from '../common/enums/nftType.enum';
import { SellingStatus } from '../common/enums/sellingStatus.enum';

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
  constructor(
    @InjectModel(Nft.name) private nftModel: Model<NftDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Selling.name) private sellingModel: Model<SellingDocument>,
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
        creator: createNftInput.user._id,
        tags: nftTagsObjectIds,
        transactionHash: createNftInput.transactionHash ? createNftInput.transactionHash : '',
        chainId: createNftInput.chainId ? createNftInput.chainId : 0,
        supply: createNftInput.supply,
        masterOwner: {
          user: createNftInput.user._id,
          supply: 1,
        },
        licenseOwners: [
          {
            user: createNftInput.user._id,
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

  async setTokenId(
    tokenId: number,
    contractAddress: string,
    chainId: number,
    transactionHash: string,
    uri: string,
  ): Promise<void> {
    await this.nftModel.updateOne(
      { contractAddress: contractAddress.toLowerCase(), chainId, ipfsUrl: uri },
      {
        $set: {
          tokenId,
          transactionHash,
        },
      },
    );
  }

  async changeOwner(
    sellerEthAddress: string,
    buyerEthAddress: string,
    amount: number,
    contractAddress: string,
    tokenId: number,
    isMaster: boolean,
    chainId: number,
    transactionHash: string,
  ) {
    const nft = await this.nftModel.findOne({ contractAddress, tokenId, chainId });

    if (!nft) {
      console.log(
        `Error transferring ownership - no NFT found! FROM: ${sellerEthAddress} TO: ${buyerEthAddress} TXHash: ${transactionHash}`,
      );
      return;
    }

    let currentSellerSupply;
    const buyer = await this.userModel.findOne({ ethAddress: buyerEthAddress.toLowerCase() });
    const seller = await this.userModel.findOne({ ethAddress: sellerEthAddress.toLowerCase() });
    const licenseOwners = await this.getLicenseOwners(nft);
    const masterOwner = await this.userModel.findOne({ _id: nft.masterOwner.user._id });
    const licenseOwner = licenseOwners.find(
      (licenseOwner) => licenseOwner.user.ethAddress.toLowerCase() === sellerEthAddress.toLowerCase(),
    );

    const selling = await this.sellingModel.findOne({
      nftType: isMaster ? NftType.MASTER : NftType.LICENSE,
      sellingStatus: SellingStatus.OPEN,
      nft: nft._id,
      seller: seller._id,
    });

    if (!selling) {
      console.log(
        `Error transferring ownership - no selling found! FROM: ${sellerEthAddress} TO: ${buyerEthAddress} TXHash: ${transactionHash}`,
      );
      return;
    }

    const existingTxHash = selling.buyers.find((buyer) => buyer.transactionHash === transactionHash);

    if (existingTxHash) {
      console.log(
        `Error transferring ownership - transactionHash already processed! FROM: ${sellerEthAddress} TO: ${buyerEthAddress} TXHash: ${transactionHash}`,
      );
      return;
    }

    const sellingSupplyLeft = selling.buyers.reduce((supply, buyer) => {
      return supply + buyer.supply;
    }, 0);

    if (sellingSupplyLeft - amount < 0) {
      console.log(
        `Error transferring ownership - selling has not enough supply! FROM: ${sellerEthAddress} TO: ${buyerEthAddress} TXHash: ${transactionHash}`,
      );
      return;
    }

    if (isMaster) {
      if (masterOwner.ethAddress.toLowerCase() !== sellerEthAddress) {
        console.log(
          `Error transferring ownership - Seller is not owner! FROM: ${sellerEthAddress} TO: ${buyerEthAddress} TXHash: ${transactionHash}`,
        );
        return;
      }
      currentSellerSupply = nft.masterOwner.supply;
    } else {
      if (!licenseOwner && licenseOwner.user.ethAddress.toLowerCase() !== sellerEthAddress) {
        console.log(
          `Error transferring ownership - Seller is not owner! FROM: ${sellerEthAddress} TO: ${buyerEthAddress} TXHash: ${transactionHash}`,
        );
        return;
      }

      currentSellerSupply = licenseOwner.supply;
    }

    if (currentSellerSupply - amount < 0) {
      console.log(
        `Error transferring ownership - Seller has not enough supply! FROM: ${sellerEthAddress} TO: ${buyerEthAddress} TXHash: ${transactionHash}`,
      );
      return;
    }

    if (isMaster) {
      await this.nftModel.updateOne(
        { contractAddress, tokenId, chainId },
        {
          $set: {
            'masterOwner.user': buyer,
          },
        },
      );
    } else {
      let isNewBuyer = true;
      const newLicenseOwners = licenseOwners.map((licenseOwner_) => {
        if (licenseOwner_.user._id === licenseOwner.user._id) {
          return { user: licenseOwner.user, supply: licenseOwner_.supply - amount };
        }
        if (licenseOwner_.user._id === buyer._id) {
          isNewBuyer = false;
          return { user: buyer, supply: licenseOwner_.supply + amount };
        }
        return licenseOwner_;
      });
      if (isNewBuyer) {
        newLicenseOwners.push({ user: buyer, supply: amount });
      }
      await this.nftModel.updateOne(
        { contractAddress, tokenId, chainId },
        {
          $set: {
            licenseOwners,
          },
        },
      );
    }

    selling.buyers.push({ user: buyer._id, supply: amount, transactionHash });
    await this.sellingModel.updateOne({ _id: selling._id }, { $set: { buyers: selling.buyers } });

    if (sellingSupplyLeft - amount === 0) {
      await this.sellingModel.updateOne(
        { _id: selling._id },
        { $set: { sellingStatus: SellingStatus.CLOSED } },
      );
    }
  }

  async getLicenseOwners(nft: Nft) {
    const ownerIds = nft.licenseOwners.map((owner) => owner.user._id);
    const owners = await this.userModel.find({ _id: { $in: ownerIds } });

    const licenseOwners = owners.map((owner) => {
      const licenseOwner = nft.licenseOwners.find((licenseOwner) => licenseOwner.user._id === owner._id);
      return { user: owner, supply: licenseOwner.supply };
    });

    return licenseOwners;
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
