import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { NftService } from './nft.service';
import { Nft } from './dto/output/nft.output';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { FileService } from '../file/file.service';
import crypto from 'crypto';
import { NftInput } from './dto/input/create-nft.input';
import { IPFSService } from '../ipfs/ipfs.service';
import { ConfigService } from '@nestjs/config';
import { NftFilter } from './dto/input/nft-filter.input';
import { NftsFilter } from './dto/input/nfts-filter.input';
import { ForbiddenException, forwardRef, Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser, LoggedinUser } from '../user/decorators/user.decorator';
import { Nft as NftSchema } from './nft.schema';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import { NftOwner } from './dto/output/nft.output';
import { NftSelling, SellingService } from '../selling/selling.service';
import { UserNfts } from './dto/output/user-nfts.output';
import { GqlAuthGuardContinue } from '../auth/gql-auth-continue.guard';
import { Types } from 'mongoose';
import { NftSearch } from './dto/output/nft-search.output';
import { NftSearchInput } from './dto/input/nft-search.input';

@Resolver(() => Nft)
export class NftResolver {
  constructor(
    private nftService: NftService,
    private fileService: FileService,
    private ipfsService: IPFSService,
    private configService: ConfigService,
    private userService: UserService,
    @Inject(forwardRef(() => SellingService))
    private sellingService: SellingService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Nft)
  async createNft(
    @Args({ name: 'NFTFile', type: () => GraphQLUpload })
    { createReadStream: createReadStreamAudio }: FileUpload,
    @Args({ name: 'pictureFile', type: () => GraphQLUpload })
    { createReadStream: createReadStreamImage }: FileUpload,
    @Args('data') nftData: NftInput,
    @CurrentUser() user: LoggedinUser,
  ): Promise<NftSchema> {
    const bucket = 'soundverse-nft';
    const rndFileNameAudio = crypto.randomBytes(32).toString('hex');
    const rndFileNameImage =  `cover/${rndFileNameAudio}`

    const fileAudioUrl = await this.fileService.uploadFileToBucket(rndFileNameAudio, bucket, createReadStreamAudio);
    const filePictureUrl = await this.fileService.uploadFileToBucket(
      rndFileNameImage,
      bucket,
      createReadStreamImage,
    );
    const awsReadStreamAudio = this.fileService.getAWSReadStream(bucket, rndFileNameAudio);
    const awsReadStreamImage = this.fileService.getAWSReadStream(bucket, rndFileNameImage);

    const { ipfsMetadata, ipfsMetadataUrl, metadata } = await this.ipfsService.storeNFTonIPFS(
      awsReadStreamImage,
      awsReadStreamAudio,
      rndFileNameAudio,
      nftData
    );

    const isDuplicate = await this.nftService.isDuplicate(ipfsMetadataUrl);

    if (isDuplicate) {
      throw new ForbiddenException('This NFT was already created.');
    } else {
      return await this.nftService.createNft({
        metadata,
        ipfsUrl: ipfsMetadataUrl,
        fileUrl: fileAudioUrl,
        filePictureUrl,
        user,
        supply: nftData.supply,
        tags: nftData.tags,
        transactionHash: nftData.transactionHash ? nftData.transactionHash : '',
        chainId: nftData.chainId ? nftData.chainId : 0,
        royaltyFeeMaster: nftData.royaltyFeeMaster,
        royaltyFeeLicense: nftData.royaltyFeeLicense,
        creatorOwnerSplit: nftData.creatorOwnerSplit,
        soundWave: nftData.soundWave,
        trackDuration: nftData.trackDuration,
        trackBpm: nftData.trackBPM,
      });
    }
  }

  @Query(() => [Nft], { nullable: true })
  async nfts(
    @Args('skip', { type: () => Int }) skip: number,
    @Args('limit', { type: () => Int }) limit: number,
    @Args('filter', { nullable: true }) filter?: NftsFilter,
  ) {
    //TODO: implement hasSellings filter!
    return await this.nftService.getNfts(limit, skip, filter);
  }

  @Query(() => Nft, { nullable: true })
  async nft(@Args('filter') filter: NftFilter): Promise<NftSchema> {
    return await this.nftService.findNft(filter);
  }

  @Query(() => NftSearch, { nullable: true })
  async search(@Args('searchInput') searchInput: NftSearchInput): Promise<NftSearch> {
    return await this.nftService.search(searchInput);
  }

  @UseGuards(GqlAuthGuardContinue)
  @Query(() => UserNfts)
  async userNfts(
    @CurrentUser() user: LoggedinUser,
    @Args('ethAddress', { nullable: true }) ethAddress?: string,
  ): Promise<UserNfts> {
    let fetchedUser = null;
    if (!user) {
      if (!ethAddress) {
        return;
      }
      fetchedUser = await this.userService.findByETHAddress(ethAddress);
    }
    return await this.nftService.getUserNfts(user ? user : fetchedUser);
  }

  @ResolveField()
  async creator(@Parent() nft: NftSchema): Promise<User> {
    if (!nft?.creator) {
      return;
    }
    return await this.userService.findUserById(nft.creator);
  }

  @ResolveField()
  async masterOwner(@Parent() nft: NftSchema): Promise<NftOwner> {
    if (!nft?.masterOwner?.user) {
      return;
    }
    const masterOwnerUser = await this.userService.findUserById(nft.masterOwner.user);
    return { user: masterOwnerUser, supply: nft.masterOwner.supply };
  }

  @ResolveField()
  async licenseOwners(@Parent() nft: NftSchema): Promise<NftOwner[]> {
    if (!nft?.licenseOwners) {
      return;
    }
    const licenseOwnersUser = await this.userService.findUserByIds(
      nft.licenseOwners.map((licenseOwner) => new Types.ObjectId(licenseOwner.user)),
    );

    return licenseOwnersUser.map((licenseOwnerUser) => {
      const owner = nft.licenseOwners.find(
        (licenseOwner) => licenseOwner?.user?._id?.toString() === licenseOwnerUser?._id?.toString(),
      );

      return {
        user: licenseOwnerUser,
        supply: owner?.supply ?? 0,
      };
    });
  }

  @ResolveField()
  async sellings(@Parent() nft: NftSchema): Promise<NftSelling> {
    const nftSellings = await this.sellingService.getNftSellingByNftId(new Types.ObjectId(nft._id));
    return nftSellings;
  }
}
