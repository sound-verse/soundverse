import { registerEnumType } from '@nestjs/graphql';

export enum SellingStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

registerEnumType(SellingStatus, {
  name: 'SellingStatus',
});
