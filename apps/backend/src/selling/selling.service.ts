import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SellingStatus } from '../common/enums/sellingStatus.enum';
import { Nft, NftDocument } from '../nft/nft.schema';
import { SellingFilter } from './dto/input/selling-filter.input';
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
    filter?: SellingFilter,
  ): Promise<Selling[]> {
    const findFilter = {
      sellingStatus: SellingStatus.OPEN,
      ...(filter.nftType && { nftType: filter.nftType }),
      ...(filter.nftContractAddress && { 'sellingVoucher.nftContractAddress': filter.nftContractAddress }),
      ...(filter.tokenId && { 'sellingVocher.tokenId': filter.tokenId }),
    };

    return await this.sellingModel
      .find(findFilter)
      .sort({
        createdAt: 1,
      })
      .skip(documentsToSkip)
      .limit(limitOfDocuments);
  }

  async voucherIsValid(voucher: Voucher, ethAddress: string): Promise<boolean> {
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

    const mintedNft = await this.nftModel.findOne({
      tokenId: voucher.tokenId,
      contractAddress: voucher.nftContractAddress,
    });

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
          tokenId: voucher.tokenId,
          nftContractAddress: voucher.nftContractAddress,
          price: voucher.price,
          sellCount: voucher.sellCount,
          tokenUri: voucher.tokenUri,
          supply: voucher.supply,
          isMaster: voucher.isMaster,
        },
      },
      signature: voucher.signature,
      version: sigUtil.SignTypedDataVersion.V4,
    });

    return address.toLowerCase() !== ethAddress.toLowerCase() ? false : true;
  }

  async createSelling(createSellingInput: CreateSellingInput, seller: User): Promise<Selling> {
    if (!this.voucherIsValid(createSellingInput.sellingVoucher, seller.ethAddress)) {
      throw new ForbiddenException('NftVoucher signature is not valid!');
    }

    const selling = new this.sellingModel({
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
