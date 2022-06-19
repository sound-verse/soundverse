import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SellingStatus } from '../common/enums/sellingStatus.enum';
import { Nft, NftDocument } from '../nft/nft.schema';
import { SellingsFilter } from './dto/input/sellings-filter.input';
import { MintVoucher, Selling, SellingDocument } from './selling.schema';
import * as sigUtil from '@metamask/eth-sig-util';
import { ConfigService } from '@nestjs/config';
import { CreateSellingInput, SaleVoucherInput } from './dto/input/create-selling.input';
import { User, UserDocument } from '../user/user.schema';
import { NftType } from '../common/enums/nftType.enum';
import { CreateMintSellingInput, MintVoucherInput } from './dto/input/create-mint-selling.input';

export type NftSelling = {
  masterSelling: Selling;
  licenseSellings: Selling[];
};

@Injectable()
export class SellingService {
  constructor(
    @InjectModel(Selling.name) private sellingModel: Model<SellingDocument>,
    @InjectModel(Nft.name) private nftModel: Model<NftDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  async getNftSellingByNftId(nftId: Types.ObjectId): Promise<NftSelling> {
    const sellingFilter = {
      nft: nftId,
      sellingStatus: SellingStatus.OPEN,
    };
    const masterSelling = await this.sellingModel.findOne({ ...sellingFilter, nftType: NftType.MASTER });
    const licenseSellings = await this.sellingModel.find({ ...sellingFilter, nftType: NftType.LICENSE });

    return { masterSelling, licenseSellings };
  }

  async getOpenSellings(
    limitOfDocuments = 100,
    documentsToSkip = 0,
    filter?: SellingsFilter,
  ): Promise<Selling[]> {
    const findFilter = {
      sellingStatus: SellingStatus.OPEN,
      ...(filter.nftType && { nftType: filter.nftType }),
      ...(filter.nftContractAddress && {
        $or: [{ 'saleVoucher.nftContractAddress': filter.nftContractAddress }],
      }),
      ...(filter.tokenId && {
        $or: [{ 'saleVoucher.tokenId': filter.tokenId }, { 'mintVoucher.tokenId': filter.tokenId }],
      }),
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

  async checkVoucherAndReturn(
    voucher: MintVoucherInput | SaleVoucherInput,
    nftId: string,
    seller: User,
  ): Promise<MintVoucher> {
    const mintedNft = await this.nftModel.findOne({
      _id: nftId,
    });

    const isMintVoucher = mintedNft.tokenId > 0 ? false : true;

    if (mintedNft.tokenId && isMintVoucher) {
      throw new ForbiddenException('NFT already minted');
    }

    if (!mintedNft.tokenId && !isMintVoucher) {
      throw new ForbiddenException('NFT not yet minted');
    }

    let sellerSupply = 0;
    let owner = undefined;
    if (voucher.isMaster) {
      owner = mintedNft.masterOwner;
    } else {
      owner = mintedNft.licenseOwners.find((licenseOwner) => licenseOwner.user._id === seller._id);
    }
    sellerSupply = owner?.supply ?? 0;

    if (sellerSupply < voucher.supply) {
      throw new ForbiddenException('NftVoucher signature is not valid!');
    }

    let voucherTypes, voucherProps;
    if (isMintVoucher) {
      voucherTypes = {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        SVVoucher: [
          { name: 'price', type: 'uint256' },
          { name: 'tokenUri', type: 'string' },
          { name: 'supply', type: 'uint256' },
          { name: 'maxSupply', type: 'uint256' },
          { name: 'isMaster', type: 'bool' },
          { name: 'currency', type: 'string' },
          { name: 'royaltyFeeMaster', type: 'uint96' },
          { name: 'royaltyFeeLicense', type: 'uint96' },
          { name: 'creatorOwnerSplit', type: 'uint96' },
          { name: 'validUntil', type: 'uint256' },
        ],
      };
      voucherProps = {
        price: voucher.price,
        tokenUri: mintedNft.ipfsUrl,
        supply: voucher.supply,
        maxSupply: mintedNft.supply,
        isMaster: voucher.isMaster,
        currency: voucher.currency,
        royaltyFeeMaster: mintedNft.royaltyFeeMaster,
        royaltyFeeLicense: mintedNft.royaltyFeeLicense,
        creatorOwnerSplit: mintedNft.creatorOwnerSplit,
        validUntil: voucher.validUntil.getTime(),
      };
    } else {
      voucherTypes = {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        SVVoucher: [
          { name: 'nftContractAddress', type: 'address' },
          { name: 'price', type: 'uint256' },
          { name: 'tokenUri', type: 'string' },
          { name: 'supply', type: 'uint256' },
          { name: 'isMaster', type: 'bool' },
          { name: 'currency', type: 'string' },
          { name: 'validUntil', type: 'uint256' },
        ],
      };

      voucherProps = {
        nftContractAddress: (voucher as SaleVoucherInput).nftContractAddress,
        price: voucher.price,
        tokenUri: mintedNft.ipfsUrl,
        supply: voucher.supply,
        isMaster: voucher.isMaster,
        currency: voucher.currency,
        validUntil: voucher.validUntil,
      };
    }

    const address = sigUtil.recoverTypedSignature({
      data: {
        types: voucherTypes,
        primaryType: 'SVVoucher',
        domain: {
          name: 'SVVoucher',
          version: '1',
          chainId: mintedNft.chainId,
          verifyingContract: this.configService.get('MARKET_CONTRACT_ADDRESS').toLowerCase(),
        },
        message: voucherProps,
      },
      signature: voucher.signature,
      version: sigUtil.SignTypedDataVersion.V4,
    });

    if (address.toLowerCase() !== seller.ethAddress.toLowerCase()) {
      throw new ForbiddenException('NftVoucher signature is not valid!');
    }

    return { ...voucherProps, signature: voucher.signature };
  }

  async unlistSelling(sellerEthAddress: string, uri: string, contractAddress: string) {
    const seller = await this.userModel.findOne({ ethAddress: sellerEthAddress.toLowerCase() });
    const selling = await this.sellingModel.findOne({
      sellingStatus: SellingStatus.OPEN,
      seller: seller._id,
      $or: [
        {
          'saleVoucher.nftContractAddress': contractAddress.toLowerCase(),
          'saleVoucher.tokenUri': uri,
        },
        {
          'mintVoucher.nftContractAddress': contractAddress.toLowerCase(),
          'mintVoucher.tokenUri': uri,
        },
      ],
    });

    if (!selling) {
      console.log(
        `Selling not found or already unlisted SELLER: ${sellerEthAddress} uri: ${uri} contractAddress: ${contractAddress}`,
      );
      return;
    }

    selling.sellingStatus = SellingStatus.CLOSED;
    await selling.save();
  }

  async createSelling(createSellingInput: CreateSellingInput, seller: User): Promise<Selling> {
    const voucher = await this.checkVoucherAndReturn(
      createSellingInput.saleVoucherInput,
      createSellingInput.nftId,
      seller,
    );

    const selling = new this.sellingModel({
      nft: new Types.ObjectId(createSellingInput.nftId),
      seller: seller._id,
      saleVoucher: voucher,
      nftType: createSellingInput.saleVoucherInput.isMaster ? NftType.MASTER : NftType.LICENSE,
      marketplaceContractAddress: this.configService.get('MARKET_CONTRACT_ADDRESS').toLowerCase(),
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

  async createMintSelling(createMintSellingInput: CreateMintSellingInput, seller: User): Promise<Selling> {
    const voucher = await this.checkVoucherAndReturn(
      createMintSellingInput.mintVoucherInput,
      createMintSellingInput.nftId,
      seller,
    );

    const selling = new this.sellingModel({
      nft: new Types.ObjectId(createMintSellingInput.nftId),
      seller: seller._id,
      mintVoucher: voucher,
      nftType: createMintSellingInput.mintVoucherInput.isMaster ? NftType.MASTER : NftType.LICENSE,
      marketplaceContractAddress: this.configService.get('MARKET_CONTRACT_ADDRESS').toLowerCase(),
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
