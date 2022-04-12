import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from '../core/core.module';
import { Tag, TagSchema } from './tag.schema';
import { TagService } from './tag.service';

@Module({
  imports: [CoreModule, MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
