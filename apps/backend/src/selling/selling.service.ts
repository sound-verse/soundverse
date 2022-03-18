import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SellingStatus } from '../common/enums/sellingStatus.enum';
import { Nft, NftDocument } from '../nft/nft.schema';
import { SellingsFilter } from './dto/input/sellings-filter.input';
import { Selling, SellingDocument } from './selling.schema';
import * as sigUtil from '@metamask/eth-sig-util';
import { ConfigService } from '@nestjs/config';
import { CreateSellingInput } from './dto/input/create-selling.input';
import { User } from '../user/user.schema';
import { NftType } from '../common/enums/nftType.enum';

export type Voucher = {
  nftContractAddress: string;
  price: number;
  sellCount: number;
  tokenUri: string;
  tokenId: number;
  supply: number;
  isMaster: boolean;
  signature: string;
  currency: string;
};

@Injectable()
export class SellingService {
  constructor(
    @InjectModel(Selling.name) private sellingModel: Model<SellingDocument>,
    @InjectModel(Nft.name) private nftModel: Model<NftDocument>,
    private configService: ConfigService,
  ) {}

  async getOpenSellings(
    limitOfDocuments = 100,
    documentsToSkip = 0,
    filter?: SellingsFilter,
  ): Promise<Selling[]> {
    const findFilter = {
      sellingStatus: SellingStatus.OPEN,
      ...(filter.nftType && { nftType: filter.nftType }),
      ...(filter.nftContractAddress && { 'sellingVoucher.nftContractAddress': filter.nftContractAddress }),
      ...(filter.tokenId && { 'sellingVocher.tokenId': filter.tokenId }),
      ...(filter.nftId && { nft: new Types.ObjectId(filter.nftId) }),
    };
    const sellings = await this.sellingModel
      .find(findFilter)
      .sort({
        createdAt: 1,
      })
      .skip(documentsToSkip)
      .limit(limitOfDocuments);

    return sellings;
  }

  async voucherIsValid(voucher: Voucher, nftId: string, seller: User): Promise<boolean> {
    const sellingVoucherTypes = {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      SellingVoucher: [
        { name: 'tokenId', type: 'uint256' },
        { name: 'nftContractAddress', type: 'address' },
        { name: 'price', type: 'uint256' },
        { name: 'sellCount', type: 'uint256' },
        { name: 'tokenUri', type: 'string' },
        { name: 'supply', type: 'uint256' },
        { name: 'isMaster', type: 'bool' },
        { name: 'currency', type: 'string' },
      ],
    };

    const mintedNft = await this.nftModel.findOne({
      _id: nftId,
    });

    let sellerSupply = 0;
    let owner = undefined;
    if (voucher.isMaster) {
      owner = mintedNft.masterOwner;
    } else {
      owner = mintedNft.licenseOwners.find((licenseOwner) => licenseOwner.user._id === seller._id);
    }
    sellerSupply = owner?.supply ?? 0;

    if (sellerSupply < voucher.supply && sellerSupply > 0) {
      return false;
    }

    const address = sigUtil.recoverTypedSignature({
      data: {
        types: sellingVoucherTypes,
        primaryType: 'SellingVoucher',
        domain: {
          name: 'NFTVoucher',
          version: '1',
          chainId: mintedNft.chainId,
          verifyingContract: this.configService.get('MARKET_CONTRACT_ADDRESS'),
        },
        message: {
          tokenId: voucher.tokenId,
          nftContractAddress: voucher.nftContractAddress,
          price: voucher.price,
          sellCount: voucher.sellCount,
          tokenUri: voucher.tokenUri,
          supply: voucher.supply,
          isMaster: voucher.isMaster,
          currency: voucher.currency,
        },
      },
      signature: voucher.signature,
      version: sigUtil.SignTypedDataVersion.V4,
    });

    console.log('seller', seller.ethAddress);
    return address.toLowerCase() !== seller.ethAddress.toLowerCase() ? false : true;
  }

  async createSelling(createSellingInput: CreateSellingInput, seller: User): Promise<Selling> {
    if (!(await this.voucherIsValid(createSellingInput.sellingVoucher, createSellingInput.nftId, seller))) {
      throw new ForbiddenException('NftVoucher signature is not valid!');
    }

    const selling = new this.sellingModel({
      nft: new Types.ObjectId(createSellingInput.nftId),
      seller: seller._id,
      sellingVoucher: createSellingInput.sellingVoucher,
      nftType: createSellingInput.sellingVoucher.isMaster ? NftType.MASTER : NftType.LICENSE,
      marketplaceContractAddress: this.configService.get('MARKET_CONTRACT_ADDRESS'),
      sellingStatus: SellingStatus.OPEN,
    });

    try {
      await selling.save();
      return selling;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error creating the selling.');
    }
  }
}
