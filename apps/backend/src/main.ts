import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { truncate } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors({
    origin: ['http://localhost:3000', 'https://testflight.soundverse.io', 'https://app.soundverse.io'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${configService.get('RABBITMQ_USER')}:${configService.get(
          'RABBITMQ_PASSWORD',
        )}@${configService.get('RABBITMQ_HOST')}`,
      ],
      queue: configService.get<string>('RABBITMQ_QUEUE_NAME'),
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

  console.log('microservice connected');

  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 8001);
}
void bootstrap();
