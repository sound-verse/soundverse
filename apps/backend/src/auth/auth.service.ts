import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as ethers from 'ethers';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async login(ethAddress: string, signature: string): Promise<string> {
    const user = await this.userService.findByETHAddress(ethAddress.toLowerCase());

    if (!user) {
      throw new ForbiddenException();
    }

    const msg = `To authenticate, please sign this message: ${user.ethAddress.toLowerCase()} (${user.nonce})`;

    const address = ethers.utils.verifyMessage(msg, signature);
    if (address.toLowerCase() !== ethAddress.toLowerCase()) {
      throw new ForbiddenException('Signature error.');
    }

    const authorizedWallets = [
      '0xE39569EF2A516f0CA065a8dA698C79EE739D02c1',
      '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      '0x52122acDfED5740019765889766BF9Bfd71a66f1',
    ];

    if (
      this.configService.get('ENVIRONMENT') !== 'local' &&
      !authorizedWallets.find((authAddress) => address.toLowerCase() === authAddress.toLowerCase())
    ) {
      throw new ForbiddenException('Wallet not authorized.');
    }
    user.nonce = Math.floor(Math.random() * 1000000);
    await user.save();

    return this.jwtService.sign(
      { id: user._id, ethAddress: user.ethAddress },
      { subject: user._id.toHexString(), expiresIn: '14d' },
    );
  }

  async updateNonce(ethAddress: string): Promise<number> {
    const nonce = Math.floor(Math.random() * 1000000);
    await this.userModel.findOneAndUpdate({ ethAddress: new RegExp('^' + ethAddress + '$', 'i') }, { nonce });

    return nonce;
  }

  validateUser(ethAddress: string): Promise<User> {
    return this.userService.findByETHAddress(ethAddress.toLowerCase());
  }

  async getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)['id'];
    return await this.userModel.findById(id);
  }
}
