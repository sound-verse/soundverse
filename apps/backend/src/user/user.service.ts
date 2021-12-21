import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './user.schema';
import { LoggedinUser } from './decorators/user.decorator';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  async updateUser(
    { _id: userId }: LoggedinUser,
    newUserData: UpdateUserInput,
  ) {
    return await this.userModel.findByIdAndUpdate(userId, newUserData, {
      new: true,
    });
  }

  async update(userId: string | Types.ObjectId, data: Partial<User>) {
    return await this.userModel.findByIdAndUpdate(userId, data);
  }

  async findUserById(userId: string): Promise<User> {
    return await this.userModel.findOne({ _id: userId });
  }

  async findByETHAddress(ethAddress: string): Promise<UserDocument> {
    return await this.userModel.findOne({
      ethAddress: ethAddress.toLowerCase(),
    });
  }

  async create(data: { ethAddress: string }): Promise<UserDocument> {
    return await this.userModel.create({
      ethAddress: data.ethAddress.toLowerCase(),
      nonce: Math.floor(Math.random() * 1000000),
    });
  }

  async upsertUserByEthAddress(ethAddress: string): Promise<UserDocument> {
    if (!ethAddress) {
      return null;
    }
    return await this.userModel.findOneAndUpdate(
      { ethAddress: ethAddress.toLowerCase() },
      {
        ethAddress: ethAddress.toLowerCase(),
        nonce: Math.floor(Math.random() * 1000000),
      },
      {
        upsert: true,
        new: true,
      },
    );
  }
}
