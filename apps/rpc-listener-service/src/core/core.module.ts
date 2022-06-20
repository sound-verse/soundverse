import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] }), DatabaseModule],
  providers: [],
  exports: [],
})
export class CoreModule {}
