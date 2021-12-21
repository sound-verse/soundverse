import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { GqlContext } from '../graphql/graphql.module';
import { LoggedinUser } from '../user/decorators/user.decorator';

@Injectable()
export class GqlAuthGuardContinue extends AuthGuard('jwt') {
  handleRequest<U extends LoggedinUser>(err, user: U, info, context) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      return null;
    }

    const args = context.args[1];
    if (args?.input?.userId && !user._id.equals(args.input.userId)) {
      return null;
    }

    return user;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext<GqlContext>();
  }
}
