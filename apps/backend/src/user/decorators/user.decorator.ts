import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GqlContext } from '../../graphql/graphql.module';
import { User } from '../user.schema';

export type LoggedinUser = User | null;

export const CurrentUser = createParamDecorator((data, ctx) => getUser(ctx));

export function getUser(context): User {
  const gqlCtx = GqlExecutionContext.create(context);
  const ctx = gqlCtx.getContext<GqlContext>();

  return ctx.user;
}
