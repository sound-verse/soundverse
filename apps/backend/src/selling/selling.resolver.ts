import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser, LoggedinUser } from '../user/decorators/user.decorator';
import { CreateSellingInput } from './dto/input/create-selling.input';
import { SellingsFilter } from './dto/input/sellings-filter.input';
import { Buyer, Selling } from './dto/output/selling.output';
import { SellingService } from './selling.service';
import { User } from '../user/dto/output/user.output';
import { UserService } from '../user/user.service';
import { Selling as SellingSchema } from './selling.schema';
import { NftService } from '../nft/nft.service';
import { Nft } from '../nft/nft.schema';

@Resolver(() => Selling)
export class SellingResolver {
  constructor(
    private sellingService: SellingService,
    private nftService: NftService,
    private userService: UserService,
  ) {}

  @Query(() => [Selling], { nullable: true })
  async sellings(
    @Args('skip', { type: () => Int }) skip: number,
    @Args('limit', { type: () => Int }) limit: number,
    @Args('filter', { nullable: true }) filter?: SellingsFilter,
  ) {
    return await this.sellingService.getOpenSellings(limit, skip, filter);
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
  async buyers(@Parent() selling: SellingSchema): Promise<Buyer[]> {
    if (!selling.buyers) {
      return;
    }
    const buyersUser = await this.userService.findUserByIds(selling.buyers.map((buyer) => buyer.user));

    return buyersUser.map((buyerUser) => ({
      user: buyerUser,
      supply: selling.buyers.find((buyer) => buyer.user.toString() === buyerUser._id.toString()).supply,
    }));
  }

  @ResolveField()
  async nft(@Parent() selling: SellingSchema): Promise<Nft> {
    if (!selling.nft) {
      return;
    }
    const nft = await this.nftService.findNft({ id: selling.nft._id.toString() });
    return nft;
  }
}
