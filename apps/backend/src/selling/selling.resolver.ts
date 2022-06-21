import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser, LoggedinUser } from '../user/decorators/user.decorator';
import { CreateSellingInput } from './dto/input/create-selling.input';
import { SellingsFilter } from './dto/input/sellings-filter.input';
import { Selling } from './dto/output/selling.output';
import { SellingService } from './selling.service';
import { User } from '../user/dto/output/user.output';
import { UserService } from '../user/user.service';
import { Selling as SellingSchema } from './selling.schema';
import { NftService } from '../nft/nft.service';
import { NftOwner } from '../nft/dto/output/nft.output';
import { CreateMintSellingInput } from './dto/input/create-mint-selling.input';

@Resolver(() => Selling)
export class SellingResolver {
  constructor(private sellingService: SellingService, private userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Selling)
  async createMintSelling(
    @Args('createMintSellingInput') createMintSellingInput: CreateMintSellingInput,
    @CurrentUser() user: LoggedinUser,
  ) {
    return this.sellingService.createMintSelling(createMintSellingInput, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Selling)
  async createSelling(
    @Args('createSellingInput') createSellingInput: CreateSellingInput,
    @CurrentUser() user: LoggedinUser,
  ) {
    return this.sellingService.createSelling(createSellingInput, user);
  }

  @ResolveField()
  async seller(@Parent() selling: SellingSchema): Promise<User> {
    if (!selling.seller) {
      return;
    }
    return await this.userService.findUserById(selling.seller);
  }

  @ResolveField()
  async buyers(@Parent() selling: SellingSchema): Promise<NftOwner[]> {
    if (!selling.buyers) {
      return;
    }
    const buyersUser = await this.userService.findUserByIds(selling.buyers.map((buyer) => buyer.user));
    return selling.buyers.map((buyer) => ({
      ...buyer,
      user: buyersUser.find((buyerUser) => buyerUser._id.toString() === buyer.user.toString()),
    }));
  }
}
