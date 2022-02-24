import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
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
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser, LoggedinUser } from '../user/decorators/user.decorator';
import { Nft as NftSchema } from './nft.schema';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import { VerifyNftInput } from './dto/input/verify-nft.input';
@Resolver(() => Nft)
export class NftResolver {
  constructor(
    private nftService: NftService,
    private fileService: FileService,
    private ipfsService: IPFSService,
    private configService: ConfigService,
    private userService: UserService,
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
        contractAddress: this.configService.get('ERC721_CONTRACT_ADDRESS'),
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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Nft)
  async verifyMintedNFT(
    @Args('input') input: VerifyNftInput,
    @CurrentUser() user: LoggedinUser,
  ): Promise<NftSchema> {
    return await this.nftService.verifyNft(input, user.ethAddress);
  }

  @Query(() => [Nft], { nullable: true })
  async nfts(
    @Args('skip') skip: number,
    @Args('limit') limit: number,
    @Args('filter', { nullable: true }) filter?: NftsFilter,
  ): Promise<NftSchema[]> {
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

  @ResolveField()
  async creator(@Parent() nft: Nft): Promise<User> {
    if (!nft?.creator?._id) {
      return;
    }
    return await this.userService.findUserById(nft.creator._id.toString());
  }
}
