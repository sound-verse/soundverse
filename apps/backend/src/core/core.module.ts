import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule],
  providers: [],
  exports: [],
})
export class CoreModule {}
