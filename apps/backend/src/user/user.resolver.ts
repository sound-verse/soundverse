import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser, LoggedinUser } from './decorators/user.decorator';
import { User } from './dto/output/user.output';
import { UpdateUserInput } from './dto/update-user.input';
import { UserService } from './user.service';
import { MongooseClassSerializerInterceptor } from '../MongooseClassSerializerInterceptor';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { FileService } from '../file/file.service';
import crypto from 'crypto';

@Resolver(() => User)
@UseInterceptors(MongooseClassSerializerInterceptor)
export class UserResolver {
  constructor(private userService: UserService, private fileService: FileService) {}

  @Query(() => User, { nullable: true })
  async user(@Args('ethAddress') ethAddress: string): Promise<User> {
    return this.userService.findByETHAddress(ethAddress);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  me(@CurrentUser() user: LoggedinUser): User {
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @UseInterceptors(MongooseClassSerializerInterceptor)
  @Mutation(() => User)
  async updateUser(@CurrentUser() user: LoggedinUser, @Args('data') newUserData: UpdateUserInput) {
    const data = await this.userService.updateUser(user, newUserData);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async uploadProfilePicture(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream }: FileUpload,
    @CurrentUser() user: LoggedinUser,
  ) {
    const bucket = 'soundverse-user';
    const rndFileName = crypto.randomBytes(32).toString('hex');
    const fileUrl = await this.fileService.uploadFileToBucket(rndFileName, bucket, createReadStream, 'image');

    await this.userService.update(user._id, { profileImage: fileUrl });
    return await this.userService.findByETHAddress(user.ethAddress);
  }
}
