import { registerEnumType } from '@nestjs/graphql';

export enum NftType {
  MASTER = 'MASTER',
  LICENSE = 'LICENSE',
}

registerEnumType(NftType, {
  name: 'NftType',
});
