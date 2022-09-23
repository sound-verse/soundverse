import { registerEnumType } from '@nestjs/graphql';

export enum Currency {
  MATIC = "MATIC",
}

registerEnumType(Currency, {
  name: 'Currency',
});
