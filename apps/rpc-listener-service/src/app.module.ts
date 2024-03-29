import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { RPCListenerModule } from './rpc-listener/rpc-listener.module';
import { RPCHistoryModule } from './rpc-history/rpc-history.module';

@Module({
  imports: [CoreModule, RPCListenerModule, RPCHistoryModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
