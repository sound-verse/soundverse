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
      {
        ipfsUrl,
        chainId: createNftInput.chainId,
      },
      {
        verified: true,
        metadata: createNftInput.metadata,
        masterContractAddress: this.configService.get('MASTER_CONTRACT_ADDRESS'),
        licenseContractAddress: this.configService.get('LICENSE_CONTRACT_ADDRESS'),
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

  async findNft({ ipfsUrl, tokenId, id }: NftFilter): Promise<Nft> {
    const searchObject = {
      ...(ipfsUrl && { ipfsUrl }),
      ...(tokenId && { tokenId }),
      ...(id && { _id: id }),
    };
    return await this.nftModel.findOne(searchObject);
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
    //TODO: Bad implementation! We need to find a way, to wait for the MasterMintEvent, before tansfer event is fireing!
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(true);
      }, 1000),
    );

    const nft = await this.nftModel.findOne({
      $or: [
        { masterContratAddress: contractAddress.toLowerCase() },
        { licenseContratAddress: contractAddress.toLowerCase() },
      ],
      tokenId,
      chainId,
    });

    if (!nft) {
      console.log(
        `Error transferring ownership - no NFT found! FROM: ${sellerEthAddress} TO: ${buyerEthAddress} TXHash: ${transactionHash}`,
      );
      return;
    }
    let currentSellerSupply;
    const buyer = await this.userModel.findOne({ ethAddress: buyerEthAddress.toLowerCase() });
    const seller = await this.userModel.findOne({ ethAddress: sellerEthAddress.toLowerCase() });

    const masterOwner = await this.userModel.findOne({ _id: nft.masterOwner.user._id });
    const licenseOwner = nft.licenseOwners.find(
      (licenseOwner) => licenseOwner.user._id.toString() === seller._id.toString(),
    );

    const masterOwnerLicenseSupply = nft.licenseOwners.reduce((supply, license) => {
      if (license.user._id.toString() === masterOwner.id.toString()) {
        return supply + license.supply;
      }
      return supply;
    }, 0);

    const selling = await this.sellingModel.findOne({
      nftType: isMaster ? NftType.MASTER : NftType.LICENSE,
      sellingStatus: SellingStatus.OPEN,
      nft: nft._id,
      seller: seller._id,
    });

    if (!selling) {
      return;
    }

    const existingTxHash = selling.buyers.find((buyer) => buyer.transactionHash === transactionHash);

    if (existingTxHash) {
      console.log(
        `Error transferring ownership - transactionHash already processed! FROM: ${sellerEthAddress} TO: ${buyerEthAddress} TXHash: ${transactionHash}`,
      );
      return;
    }

    const alreadyBoughtSupply = selling.buyers.reduce((supply, buyer) => {
      return supply + buyer.supply;
    }, 0);

    if (selling.sellingVoucher.supply - alreadyBoughtSupply - amount < 0) {
      console.log(
        `Error transferring ownership - Selling has not enough supply! FROM: ${sellerEthAddress} TO: ${buyerEthAddress} TXHash: ${transactionHash}`,
      );
      return;
    }

    if (isMaster) {
      if (masterOwner._id.toString() !== seller._id.toString()) {
        console.log(
          `Error transferring ownership - Seller is not owner! FROM: ${sellerEthAddress} TO: ${buyerEthAddress} TXHash: ${transactionHash}`,
        );
        return;
      }
      currentSellerSupply = nft.masterOwner.supply;
    } else {
      if (!licenseOwner && licenseOwner.user._id.toString() !== seller._id.toString()) {
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
      await this.setMasterOwner(nft, buyer);
      await this.setLicenseOwner(nft, buyer, masterOwnerLicenseSupply);
      await this.setLicenseOwner(nft, seller, -masterOwnerLicenseSupply);
    } else {
      await this.setLicenseOwner(nft, buyer, amount);
      await this.setLicenseOwner(nft, seller, -amount);
    }

    selling.buyers.push({ user: buyer._id, supply: amount, transactionHash });
    await this.sellingModel.updateOne({ _id: selling._id }, { $set: { buyers: selling.buyers } });

    if (selling.sellingVoucher.supply - alreadyBoughtSupply - amount === 0) {
      await this.sellingModel.updateOne(
        { _id: selling._id },
        { $set: { sellingStatus: SellingStatus.CLOSED } },
      );
    }
  }

  async setMasterOwner(nft: Nft, newMasterOwner: User) {
    await this.nftModel.updateOne(
      {
        _id: nft._id,
      },
      {
        $set: {
          'masterOwner.user': newMasterOwner._id,
        },
      },
    );
  }

  async setLicenseOwner(nft: Nft, newLicenseOwner: User, supply: number) {
    const existingLicenseOwner = nft.licenseOwners.find(
      (licenseOwner) => licenseOwner.user._id.toString() === newLicenseOwner._id.toString(),
    );

    const query = { _id: nft._id };
    let updateOperation = {};

    if (existingLicenseOwner && existingLicenseOwner.supply + supply > 0) {
      query['licenseOwners.user'] = existingLicenseOwner.user._id;
      updateOperation = {
        $set: {
          'licenseOwners.$': { ...existingLicenseOwner, supply: existingLicenseOwner.supply + supply },
        },
      };
    } else if (existingLicenseOwner && existingLicenseOwner.supply + supply === 0) {
      updateOperation = {
        $pull: {
          licenseOwners: { user: existingLicenseOwner.user._id },
        },
      };
    } else if (!existingLicenseOwner) {
      updateOperation = { $addToSet: { licenseOwners: { user: newLicenseOwner._id, supply } } };
    }

    await this.nftModel.updateOne(query, updateOperation);
  }

  async getNfts(limitOfDocuments = 100, documentsToSkip = 0, filter?: NftsFilter): Promise<Nft[]> {
    if (filter?.creatorEthAddress) {
      const creator = await this.userService.findByETHAddress(filter.creatorEthAddress.toLowerCase());
      if (!creator) {
        return null;
      }
      return this.nftModel.find({ verified: true, creator: creator._id });
    }

    if (filter?.masterOwnerEthAddress) {
      const masterOwner = await this.userService.findByETHAddress(filter.masterOwnerEthAddress.toLowerCase());
      if (!masterOwner) {
        return null;
      }
      return this.nftModel.find({ verified: true, 'masterOwner.user': masterOwner._id });
    }

    if (filter?.licenseOwnerEthAddress) {
      const licenseOwner = await this.userService.findByETHAddress(
        filter.licenseOwnerEthAddress.toLowerCase(),
      );
      if (!licenseOwner) {
        return null;
      }
      return this.nftModel.find({ verified: true, 'licenseOwners.user': licenseOwner._id });
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
