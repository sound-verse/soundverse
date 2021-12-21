import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ApolloError } from 'apollo-server-express';
import { GqlContext } from '../graphql/graphql.module';
import { LoggedinUser } from '../user/decorators/user.decorator';
import * as _ from 'lodash';

type Strategy = 'jwt';

@Injectable()
export class GqlAuthGuard extends AuthGuard(['jwt']) {
  constructor(private readonly strategies: Strategy[] = ['jwt']) {
    super();
  }

  handleRequest<U extends LoggedinUser>(err, user: U, info, context) {
    if (err) {
      throw err;
    }

    if (!user) {
      throw new ApolloError('UNAUTHORIZED');
    }

    const args = context.args[1];
    if (args?.input?.userId && !user?._id.equals(args.input.userId)) {
      throw new ApolloError('UNAUTHORIZED');
    }

    return user;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext<GqlContext>();
  }
}
