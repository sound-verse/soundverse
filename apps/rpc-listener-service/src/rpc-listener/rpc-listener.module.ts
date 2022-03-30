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
              // setup the dead letter exchange to point to the default exchange
              deadLetterExchange: '',
              // dead letters from our queue should be routed to the recovery-queue
              deadLetterRoutingKey: configService.get('RABBITMQ_RECOVERY_QUEUE_NAME'),
              // set message time to live to 4s
              messageTtl: 4000,
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
