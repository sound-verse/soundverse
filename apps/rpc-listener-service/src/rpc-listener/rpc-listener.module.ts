import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoreModule } from '../core/core.module';
import { RPCListenerService } from './rpc-listener.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [CoreModule, ConfigModule],
  providers: [
    RPCListenerService,
    {
      provide: 'SC_BLOCKCHAIN_EVENTS_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${configService.get('RABBITMQ_USER')}:${configService.get(
                'RABBITMQ_PASSWORD',
              )}@${configService.get('RABBITMQ_HOST')}`,
            ],
            queue: configService.get('RABBITMQ_QUEUE_NAME'),
            noAck: false,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [RPCListenerService],
})
export class RPCListenerModule {}
