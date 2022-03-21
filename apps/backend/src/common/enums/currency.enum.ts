import { registerEnumType } from '@nestjs/graphql';

export enum Currency {
  MATIC,
}

registerEnumType(Currency, {
  name: 'Currency',
});
