import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Args, Int, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { Auth } from './auth';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { VerificationTokenInput } from './dto/verification-token.input';

@UseInterceptors(ClassSerializerInterceptor)
@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService, private readonly userService: UserService) {}

  @Mutation(() => Int)
  async generateVerificationToken(@Args('data') data: VerificationTokenInput) {
    const user = await this.userService.upsertUserByEthAddress(data.ethAddress);

    if (!user.nonce) {
      const newNonce = await this.auth.updateNonce(data.ethAddress);
      return newNonce;
    }

    return user.nonce;
  }

  @Mutation(() => Auth)
  async login(@Args('data') { ethAddress, signature }: LoginInput) {
    const user = await this.userService.findByETHAddress(ethAddress);
    if (!user) {
      throw new Error('Could not find user');
    }

    const token = await this.auth.login(ethAddress.toLowerCase(), signature);
    return {
      token,
    };
  }

  @ResolveField('user')
  async user(@Parent() auth: Auth) {
    return await this.auth.getUserFromToken(auth.token);
  }
}
