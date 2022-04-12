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
      '0x955F5C98058ab50623a7a4aa1dD9C55372C79a5a',
      '0x50Ef709c97468ae31E5F6b7089A078C9a05197FD',
      '0xDa3b8108161CdB458a9d233498E1Aaf315EfC77e',
      '0xB46f1b478983B127FEEA9643DDc8560AF2Cd3724',
      '0x73A54343f2b73A6DC749f138690EB115A3501c5D',
      '0x457b00914C44F08fEA1A362521b9240FE3945449',
      '0x46fB855DA9D974d3720215eFF2687e065aE39612',
      '0x56f317fE462555cE9d9306a10437386A2B33D5B7',
      '0x140df23439bA3b1Aab31bA0a5295B86034cD69Db',
      '0x2546BcD3c84621e976D8185a91A922aE77ECEc30',
      '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      '0x71bE63f3384f5fb98995898A86B02Fb2426c5788',
      '0xfA5035568d44ae5c77A456C9a4142805DdeA3531',
      ''
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
