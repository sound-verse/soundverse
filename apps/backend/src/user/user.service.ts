import { Injectable } from '@nestjs/common';
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

  async updateUser({ _id: userId }: LoggedinUser, newUserData: UpdateUserInput) {
    return await this.userModel.findByIdAndUpdate(userId, newUserData, {
      new: true,
    });
  }

  async update(userId: string | Types.ObjectId, data: Partial<User>) {
    return await this.userModel.findByIdAndUpdate(userId, data);
  }

  async findUserById(userId: string | Types.ObjectId): Promise<User> {
    return await this.userModel.findOne({ _id: userId });
  }

  async findUserByIds(userIds: Types.ObjectId[]): Promise<User[]> {
    return await this.userModel.find({ _id: { $in: userIds } });
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

  async follow(user: User, userId: string): Promise<User> {
    const userToFollow = await this.findUserById(userId);

    if (!userToFollow) {
      return user;
    }

    const userToFollowAlreadyFollowed = await this.userModel.findOne({ _id: userToFollow._id, followers: user._id });

    if (userToFollowAlreadyFollowed) {
      return user;
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(user._id, {
      $addToSet: { following: userToFollow._id },
    });

    await this.userModel.updateOne({ _id: userToFollow._id }, { $addToSet: { followers: updatedUser._id } });

    return updatedUser;
  }

  async unfollow(user: User, userId: string): Promise<User> {
    const userToUnfollow = await this.findUserById(userId);

    if (!userToUnfollow) {
      return user;
    }

    const userToUnfollowAlreadyUnfollowed = await this.userModel.findOne({ _id: userToUnfollow._id, followers: user._id });

    if (!userToUnfollowAlreadyUnfollowed) {
      return user;
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(user._id, {
      $pull: { following: userToUnfollow._id },
    });

    await this.userModel.updateOne({ _id: userToUnfollow._id }, { $pull: { followers: updatedUser._id } });

    return updatedUser;
  }
}
