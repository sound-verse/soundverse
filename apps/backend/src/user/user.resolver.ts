import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser, LoggedinUser } from './decorators/user.decorator';
import { User } from './dto/output/user.output';
import { UpdateUserInput } from './dto/update-user.input';
import { UserService } from './user.service';
import { MongooseClassSerializerInterceptor } from '../MongooseClassSerializerInterceptor';

@Resolver(() => User)
@UseInterceptors(MongooseClassSerializerInterceptor)
export class UserResolver {
  constructor(private userService: UserService) {}

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
  async updateUser(
    @CurrentUser() user: LoggedinUser,
    @Args('data') newUserData: UpdateUserInput,
  ) {
    const data = await this.userService.updateUser(user, newUserData);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data;
  }
}
