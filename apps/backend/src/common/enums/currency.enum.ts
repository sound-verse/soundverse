import { registerEnumType } from '@nestjs/graphql';

export enum Currency {
  ETH = "ETH",
}

registerEnumType(Currency, {
  name: 'Currency',
});
