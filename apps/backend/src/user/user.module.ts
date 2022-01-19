import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from './user.resolver';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { CoreModule } from '../core/core.module';
import { FileService } from '../file/file.service';
import { S3Service } from '../file/s3.service';

@Module({
  imports: [CoreModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserResolver, UserService, FileService, S3Service],
  exports: [UserService],
})
export class UserModule {}
