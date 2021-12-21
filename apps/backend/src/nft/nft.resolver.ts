import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { NftService } from './nft.service';
import { Nft } from './dto/output/nft.output';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import FileType from 'file-type';
import { pipeline, Stream } from 'stream';
import fs from 'fs';
import FormData from 'form-data';
import { S3Service } from '../file/s3.service';
import crypto from 'crypto';
import { NftInput } from './dto/input/create-nft.input';
import { IPFSService } from '../ipfs/ipfs.service';
import { ConfigService } from '@nestjs/config';
import { UpdateTxInput } from './dto/input/update-tx-nft.input';
import { NftFilter } from './dto/input/nft-filter.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser, LoggedinUser } from '../user/decorators/user.decorator';
import { Nft as NftSchema } from './nft.schema';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
@Resolver(() => Nft)
export class NftResolver {
  constructor(
    private nftService: NftService,
    private s3Service: S3Service,
    private ipfsService: IPFSService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Nft)
  async createNft(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
    @Args('data') nftData: NftInput,
    @CurrentUser() user: LoggedinUser,
  ): Promise<NftSchema> {
    const bucket = 'soundverse-nft';
    const rndFileName = crypto.randomBytes(32).toString('hex');

    const writeStream = new Stream.PassThrough();
    const fileTypeStream = await FileType.stream(createReadStream());

    const uploadFile = this.s3Service.uploadFile(writeStream, rndFileName, bucket, {
      ACL: 'public-read',
      ContentType: fileTypeStream.fileType.mime,
    });

    await new Promise(
      (resolve, reject) =>
        void fileTypeStream
          .pipe(writeStream)
          .on('finish', () => resolve(true))
          .on('error', (e) => reject(e)),
    );

    await uploadFile;

    const awsReadStream = this.s3Service.getFileReadStream(bucket, rndFileName);

    const { ipfsMetadata, ipfsMetadataUrl, metadata } = await this.ipfsService.storeNFTonIPFS(
      awsReadStream,
      rndFileName,
      nftData,
    );

    if (ipfsMetadata.isDuplicate) {
      return await this.nftService.findNft({
        ipfsUrl: ipfsMetadataUrl,
        contractAddress: this.configService.get('ERC155_CONTRACT_ADDRESS'),
      });
    } else {
      return await this.nftService.createNft({
        metadata,
        ipfsUrl: ipfsMetadataUrl,
        contractAddress: this.configService.get('ERC155_CONTRACT_ADDRESS'),
        fileUrl: `${this.configService.get('INTERNAL_FILE_URL_BASE_NFT')}/${rndFileName}`,
        user,
        supply: nftData.supply,
      });
    }
  }

  @Mutation(() => Nft)
  async updateTxHash(@Args('data') data: UpdateTxInput): Promise<NftSchema> {
    return await this.nftService.update(data);
  }

  @Query(() => [Nft])
  async nfts(): Promise<NftSchema[]> {
    return await this.nftService.getNfts();
  }

  @Query(() => Nft)
  async nft(@Args('filter') filter: NftFilter): Promise<NftSchema> {
    return await this.nftService.findNft({
      contractAddress: filter.contractAddress,
      tokenId: filter.tokenId,
    });
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
