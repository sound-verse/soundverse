import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import fs from 'fs';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        if (configService.get<string>('ENVIRONMENT') === 'local') {
          return { uri: configService.get<string>('MONGODB_URI') };
        }

        const caPath = './ca.crt';
        fs.writeFileSync(caPath, Buffer.from(configService.get<string>('MONGODB_CA'), 'base64'));

        return {
          uri: configService.get<string>('MONGODB_URI'),
          sslValidate: true,
          tlsCAFile: caPath,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
