import { registerEnumType } from '@nestjs/graphql';

export enum NftType {
  MASTER,
  LICENSE,
}

registerEnumType(NftType, {
  name: 'NftType',
});
