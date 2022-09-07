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
import { UserNfts } from './dto/output/user-nfts.output';
import { NftHistoryService } from '../nft-history/nft-history.service';
import { EventType } from '@soundverse/shared-rpc-listener-service';
import { truncateSync } from 'fs';
import { NftSearch } from './dto/output/nft-search.output';
import { NftSearchInput } from './dto/input/nft-search.input';
import { SortOption } from '../common/enums/sortOption.enum';

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
  royaltyFeeMaster: number;
  royaltyFeeLicense: number;
  creatorOwnerSplit: number;
  trackDuration: number;
  soundWave: [number];
  trackBpm: number;
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
    private nftHistoryService: NftHistoryService,
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
        royaltyFeeMaster: createNftInput.royaltyFeeMaster,
        royaltyFeeLicense: createNftInput.royaltyFeeLicense,
        creatorOwnerSplit: createNftInput.creatorOwnerSplit,
        trackDuration: createNftInput.trackDuration,
        soundWave: createNftInput.soundWave,
        trackBpm: createNftInput.trackBpm,
        masterOwner: {
          user: createNftInput.user._id,
          supply: 1,
          transactionHashes: [],
        },
        licenseOwners: [
          {
            user: createNftInput.user._id,
            supply: createNftInput.supply,
            transactionHashes: [],
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
      active: true,
      ...(ipfsUrl && { ipfsUrl }),
      ...(tokenId && { tokenId }),
      ...(id && { _id: id }),
    };
    return await this.nftModel.findOne(searchObject);
  }

  async search(searchInput: NftSearchInput): Promise<NftSearch> {
    if (searchInput.search.length < 3) {
      return;
    }
    const nfts = await this.nftModel
      .find({ active: true, 'metadata.name': { $regex: `${searchInput.search}`, $options: 'i' } })
      .sort({ createdAt: -1 })
      .limit(5);
    const artists = await this.userModel
      .find({ name: { $regex: `${searchInput.search}`, $options: 'i' } })
      .sort({ createdAt: -1 })
      .limit(5);

    return {
      nfts,
      artists,
    };
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

  async isDuplicate(ipfsMetadataUrl: string): Promise<boolean> {
    const nft = await this.nftModel.findOne({
      ipfsUrl: ipfsMetadataUrl,
    });
    return !!nft;
  }

  async transferMaster(
    from: string,
    to: string,
    tokenId: number,
    chainId: number,
    transactionHash: string,
    contractAddress: string,
  ) {
    //TODO: Bad implementation! We need to find a way, to wait for the MasterMintEvent, before tansfer event is fireing!
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(true);
      }, 1000),
    );

    const existingTxHash = await this.nftHistoryService.isHistoryItemPresent(
      transactionHash,
      EventType.TRANSFER,
      contractAddress,
    );

    if (existingTxHash) {
      console.log(
        `Error transferring ownership - transactionHash already processed! FROM: ${from} TO: ${to} TXHash: ${transactionHash}`,
      );
      return;
    }

    const nft = await this.nftModel.findOne({ tokenId, chainId });

    if (!nft) {
      console.log(
        `Error transferring ownership - NFT not found! FROM: ${from} TO: ${to} TXHash: ${transactionHash}`,
      );
      return;
    }

    let receiver = await this.userService.findByETHAddress(to);
    const sender = await this.userService.findByETHAddress(from);

    if (!receiver) {
      receiver = await this.userService.create({ ethAddress: to });
    }

    await this.setMasterOwner(nft, receiver, transactionHash);

    await this.nftHistoryService.create({
      contractAddress,
      eventType: EventType.TRANSFER,
      from: sender._id,
      to: receiver._id,
      nft: nft._id,
      transactionHash,
    });
  }

  async transferLicense(
    from: string,
    to: string,
    tokenId: number,
    amount: number,
    chainId: number,
    transactionHash: string,
    contractAddress: string,
  ) {
    //TODO: Bad implementation! We need to find a way, to wait for the MasterMintEvent, before tansfer event is fireing!
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(true);
      }, 1000),
    );

    const existingTxHash = await this.nftHistoryService.isHistoryItemPresent(
      transactionHash,
      EventType.TRANSFER_SINGLE,
      contractAddress,
    );

    if (existingTxHash) {
      console.log(
        `Error transferring ownership - transactionHash already processed! FROM: ${from} TO: ${to} TXHash: ${transactionHash}`,
      );
      return;
    }

    const nft = await this.nftModel.findOne({ tokenId, chainId });

    if (!nft) {
      console.log(
        `Error transferring ownership - NFT not found! FROM: ${from} TO: ${to} TXHash: ${transactionHash}`,
      );
      return;
    }

    let receiver = await this.userService.findByETHAddress(to);
    let sender = await this.userService.findByETHAddress(from);

    if (!receiver) {
      receiver = await this.userService.create({ ethAddress: to });
    }

    if (!sender) {
      sender = await this.userService.create({ ethAddress: from });
    }

    await this.setLicenseOwner(nft, receiver, amount, transactionHash);
    await this.setLicenseOwner(nft, sender, -amount, transactionHash);

    await this.nftHistoryService.create({
      contractAddress,
      eventType: EventType.TRANSFER_SINGLE,
      from: sender._id,
      to: receiver._id,
      nft: nft._id,
      transactionHash,
    });
  }

  async changeOwner(
    saleSignature: string,
    buyerEthAddress: string,
    amount: number,
    chainId: number,
    transactionHash: string,
    voucherType: 'mint_voucher' | 'sale_voucher',
    contractAddress: string,
  ) {
    const selling = await this.sellingModel.findOne({
      ...(voucherType === 'mint_voucher'
        ? { 'mintVoucher.signature': saleSignature }
        : { 'saleVoucher.signature': saleSignature }),
    });

    if (!selling) {
      console.log(
        `Error transferring ownership - Selling not found! sale signature: ${saleSignature} TO: ${buyerEthAddress} TXHash: ${transactionHash}`,
      );
      return;
    }

    const nft = await this.nftModel.findOne({
      _id: selling.nft._id,
    });

    const buyer = await this.userModel.findOne({ ethAddress: buyerEthAddress.toLowerCase() });
    const seller = await this.userModel.findOne({ _id: selling.seller });

    if (!nft) {
      console.log(
        `Error transferring ownership - no NFT found! FROM: ${seller.ethAddress} TO: ${buyerEthAddress} TXHash: ${transactionHash}`,
      );
      return;
    }
    let currentSellerSupply;

    const masterOwner = await this.userModel.findOne({ _id: nft.masterOwner.user._id });
    const licenseOwner = nft.licenseOwners.find(
      (licenseOwner) => licenseOwner.user._id.toString() === seller._id.toString(),
    );

    const existingTxHash = await this.nftHistoryService.isHistoryItemPresent(
      transactionHash,
      voucherType === 'mint_voucher' ? EventType.REDEEMED_MINT_VOUCHER : EventType.REDEEMED_SALE_VOUCHER,
      contractAddress,
    );

    if (existingTxHash) {
      console.log(
        `Error transferring ownership - transactionHash already processed! FROM: ${seller.ethAddress} TO: ${buyer.ethAddress} TXHash: ${transactionHash}`,
      );
      return;
    }

    const alreadyBoughtSupply = selling.buyers.reduce((supply, buyer) => {
      return supply + buyer.supply;
    }, 0);

    if (
      (voucherType === 'mint_voucher' ? selling.mintVoucher.supply : selling.saleVoucher.supply) -
        alreadyBoughtSupply -
        amount <
      0
    ) {
      console.log(
        `Error transferring ownership - Selling has not enough supply! FROM: ${seller.ethAddress} TO: ${buyerEthAddress} TXHash: ${transactionHash}`,
      );
      return;
    }

    if (selling.nftType === NftType.MASTER) {
      if (masterOwner._id.toString() !== seller._id.toString()) {
        console.log(
          `Error transferring ownership - Seller is not owner! FROM: ${seller.ethAddress} TO: ${buyerEthAddress} TXHash: ${transactionHash}`,
        );
        return;
      }
      currentSellerSupply = nft.masterOwner.supply;
    } else {
      if (!licenseOwner && licenseOwner.user._id.toString() !== seller._id.toString()) {
        console.log(
          `Error transferring ownership - Seller is not owner! FROM: ${seller.ethAddress} TO: ${buyerEthAddress} TXHash: ${transactionHash}`,
        );
        return;
      }

      currentSellerSupply = licenseOwner.supply;
    }

    if (currentSellerSupply - amount < 0) {
      console.log(
        `Error transferring ownership - Seller has not enough supply! FROM: ${seller.ethAddress} TO: ${buyerEthAddress} TXHash: ${transactionHash}`,
      );
      return;
    }

    selling.buyers.push({ user: buyer._id, supply: amount });
    await this.sellingModel.updateOne({ _id: selling._id }, { $set: { buyers: selling.buyers } });

    if (
      (voucherType === 'mint_voucher' ? selling.mintVoucher.supply : selling.saleVoucher.supply) -
        alreadyBoughtSupply -
        amount ===
      0
    ) {
      await this.sellingModel.updateOne(
        { _id: selling._id },
        { $set: { sellingStatus: SellingStatus.CLOSED } },
      );
    }

    if (selling.nftType === NftType.MASTER) {
      await this.sellingModel.updateMany(
        { nft: nft._id, seller: seller._id },
        { $set: { sellingStatus: SellingStatus.CLOSED } },
      );
    }

    await this.nftHistoryService.create({
      contractAddress,
      eventType:
        voucherType === 'mint_voucher' ? EventType.REDEEMED_MINT_VOUCHER : EventType.REDEEMED_SALE_VOUCHER,
      from: seller._id,
      to: buyer._id,
      selling: selling._id,
      nft: nft._id,
      transactionHash,
    });
  }

  async setMasterOwner(nft: Nft, newMasterOwner: User, transactionHash: string) {
    await this.nftModel.updateOne(
      {
        _id: nft._id,
      },
      {
        $set: {
          'masterOwner.user': newMasterOwner._id,
        },
        $addToSet: {
          'masterOwner.transactionHashes': transactionHash,
        },
      },
    );
  }

  async setLicenseOwner(nft: Nft, newLicenseOwner: User, supply: number, transactionHash: string) {
    const existingLicenseOwner = nft.licenseOwners.find(
      (licenseOwner) => licenseOwner.user._id.toString() === newLicenseOwner._id.toString(),
    );

    const query = { _id: nft._id };
    let updateOperation = {};

    if (existingLicenseOwner && existingLicenseOwner.supply + supply > 0) {
      query['licenseOwners.user'] = existingLicenseOwner.user._id;
      updateOperation = {
        $set: {
          'licenseOwners.$': {
            ...existingLicenseOwner,
            supply: existingLicenseOwner.supply + supply,
          },
        },
      };
    } else if (existingLicenseOwner && existingLicenseOwner.supply + supply === 0) {
      updateOperation = {
        $pull: {
          licenseOwners: { user: existingLicenseOwner.user._id },
        },
      };
    } else if (!existingLicenseOwner) {
      updateOperation = {
        $addToSet: {
          licenseOwners: { user: newLicenseOwner._id, supply },
        },
      };
    }

    await this.nftModel.updateOne(query, updateOperation);
  }

  async getNfts(limitOfDocuments = 100, documentsToSkip = 0, filter?: NftsFilter): Promise<Nft[]> {
    let sortValue = {};

    switch (filter?.sortOption) {
      case SortOption.NAME: {
        sortValue = { 'metadata.name': 1 };
        break;
      }
      case SortOption.OLDEST: {
        sortValue = { _id: 1 };
        break;
      }
      default: {
        sortValue = { _id: -1 };
        break;
      }
    }

    const findQuery = this.nftModel
      .find({ verified: true, active: true })
      .collation({ locale: 'en' })
      .sort(sortValue)
      .skip(documentsToSkip)
      .limit(limitOfDocuments);

    const results = await findQuery;
    return results;
  }

  async getUserNfts(user: User): Promise<UserNfts> {
    //TODO: use aggregate here

    const ownedMasterNfts = await this.nftModel.find({
      verified: true,
      active: true,
      'masterOwner.user': user._id,
    });

    const ownedLicenseNfts = await this.nftModel.find({
      verified: true,
      active: true,
      'licenseOwners.user': user._id,
    });

    const createdMasterNfts = await this.nftModel.find({ verified: true, creator: user._id });

    const createdLicenseNfts = createdMasterNfts;

    return {
      createdMasterNfts,
      createdLicenseNfts,
      ownedMasterNfts,
      ownedLicenseNfts,
    } as any;
  }

  async getByIds(ids: (string | Types.ObjectId)[]): Promise<Nft[]> {
    return await this.nftModel.find({ _id: { $in: ids } });
  }
}
