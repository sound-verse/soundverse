import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Global, Module } from '@nestjs/common';
import fs from 'fs';

export const PUB_SUB = 'PUB_SUB';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PUB_SUB,
      useFactory: (configService: ConfigService) => {
        if (configService.get<string>('ENVIRONMENT') === 'local') {
          return new RedisPubSub({
            connection: {
              host: configService.get('REDIS_HOST'),
              port: configService.get('REDIS_PORT'),
            },
          });
        }

        return new RedisPubSub({
          connection: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
            username: configService.get('REDIS_USERNAME'),
            password: configService.get('REDIS_PASSWORD'),
            tls: {
              cert: configService.get<string>('REDIS_CA').replace("'", '').replace(/\\n/gm, '\n'),
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}
