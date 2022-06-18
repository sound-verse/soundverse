import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from '../user/user.schema';
import { ApolloServerPluginCacheControl } from 'apollo-server-core';
import { graphqlUploadExpress } from 'graphql-upload';
import { ApolloDriver } from '@nestjs/apollo';

interface SubscriptionConnectionParams {
  authorization?: string;
}

interface UserJwtPayload {
  id: string;
  ethAddress: string;
  iat: number;
}
export interface GqlContext {
  req: Request & { user?: User };
  res: Response;
  token?: UserJwtPayload;
  user?: User;
  connection: {
    context: GqlConnectionContext;
  };
}

export interface GqlConnectionContext {
  headers: Record<string, unknown>;
  token?: UserJwtPayload;
  user?: User;
}

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      inject: [ConfigService, JwtService],
      imports: [JwtModule.register({})],
      useFactory: (configService: ConfigService, jwtService: JwtService) => ({
        path: '/graphql',
        plugins: [ApolloServerPluginCacheControl({ defaultMaxAge: 5 })],
        tracing: configService.get('GRAPHQL_DEBUG') === 'true',
        debug: configService.get('GRAPHQL_DEBUG') === 'true',
        playground: configService.get('PLAYGROUND_ENABLE') === 'true',
        autoSchemaFile: './src/schema.graphql',
        introspection: true,
        buildSchemaOptions: {
          dateScalarMode: 'timestamp',
        } as any,
        context: ({ req, res, connection }: GqlContext) => {
          if (connection) return connection.context;

          let parsedToken: unknown;

          if (req?.headers?.authorization) {
            const { 1: token } = req.headers.authorization.split('Bearer ');

            parsedToken = jwtService.decode(token);
          }

          return {
            req,
            res,
            token: parsedToken,
            headers: req?.headers,
          };
        },
        cors: {
          origin: [/^(.*)/],
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
          preflightContinue: true,
          optionsSuccessStatus: 200,
          credentials: true,
        },
        // fieldResolverEnhancers: ['guards'],
        uploads: false,
        subscriptions: {
          'graphql-ws': true,
        },
      }),
    }),
  ],

  providers: [],
})
export class GraphqlModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(graphqlUploadExpress({ maxFileSize: 1024 * 1024 * 100, maxFiles: 2 }))
      .forRoutes('graphql');
  }
}
