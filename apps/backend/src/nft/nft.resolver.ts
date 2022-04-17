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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    @Args({ name: 'NFTFile', type: () => GraphQLUpload })
    { createReadStream: createReadStreamNFT }: FileUpload,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    @Args({ name: 'pictureFile', type: () => GraphQLUpload })
    { createReadStream: createReadStreamPicture }: FileUpload,
    @Args('data') nftData: NftInput,
    @CurrentUser() user: LoggedinUser,
  ): Promise<NftSchema> {
    createReadStreamPicture;
    const bucket = 'soundverse-nft';
    const rndFileName: string = crypto.randomBytes(32).toString('hex');
    const fileNFTUrl = await this.fileService.uploadFileToBucket(rndFileName, bucket, createReadStreamNFT);
    const filePictureUrl = await this.fileService.uploadFileToBucket(
      `cover/${rndFileName}`,
      bucket,
      createReadStreamPicture,
    );
    const awsReadStream = this.fileService.getAWSReadStream(bucket, rndFileName);

    const { ipfsMetadata, ipfsMetadataUrl, metadata } = await this.ipfsService.storeNFTonIPFS(
      awsReadStream,
      rndFileName,
      nftData,
    );

    if (ipfsMetadata.isDuplicate) {
      throw new ForbiddenException('This NFT was already created.');
    } else {
      return await this.nftService.createNft({
        metadata,
        ipfsUrl: ipfsMetadataUrl,
        fileUrl: fileNFTUrl,
        filePictureUrl,
        user,
        supply: nftData.supply,
        tags: nftData.tags,
        transactionHash: nftData.transactionHash ? nftData.transactionHash : '',
        chainId: nftData.chainId ? nftData.chainId : 0,
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

  @Mutation(() => Boolean)
  async unpinAll(): Promise<boolean> {
    await this.ipfsService.unPinAll();
    return true;
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
      nft.licenseOwners.map((licenseOwner) => licenseOwner.user),
    );

    return licenseOwnersUser.map((licenseOwnerUser) => {
      const owner = nft.licenseOwners.find(
        (licenseOwner) => licenseOwner.user._id.toString() === licenseOwnerUser._id.toString(),
      );

      return {
        user: licenseOwnerUser,
        supply: owner.supply,
      };
    });
  }

  @ResolveField()
  async sellings(@Parent() nft: NftSchema): Promise<NftSelling> {
    const nftSellings = await this.sellingService.getNftSellingByNftId(nft._id);
    return nftSellings;
  }
}
