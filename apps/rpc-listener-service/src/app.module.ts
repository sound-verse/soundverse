import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { RPCListenerModule } from './rpc-listener/rpc-listener.module';

@Module({
  imports: [CoreModule, RPCListenerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
