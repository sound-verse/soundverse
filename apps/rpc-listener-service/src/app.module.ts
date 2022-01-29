import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { ListenerModule } from './listener/listener.module';

@Module({
  imports: [CoreModule, ListenerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
