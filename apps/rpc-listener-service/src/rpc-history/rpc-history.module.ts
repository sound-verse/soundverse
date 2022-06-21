import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from '../core/core.module';
import { RPCHistorySchema, RPCHistory } from './rpc-history.schema';
import { RPCHistoryService } from './rpc-history.service';

@Module({
  imports: [CoreModule, MongooseModule.forFeature([{ name: RPCHistory.name, schema: RPCHistorySchema }])],
  providers: [RPCHistoryService],
  exports: [RPCHistoryService],
})
export class RPCHistoryModule {}
