import { registerEnumType } from '@nestjs/graphql';

export enum SellingStatus {
  OPEN,
  CLOSED,
}

registerEnumType(SellingStatus, {
  name: 'SellingStatus',
});
