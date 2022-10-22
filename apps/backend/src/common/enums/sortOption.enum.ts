import { registerEnumType } from '@nestjs/graphql';

export enum SortOption {
  NAME = 'NAME',
  OLDEST = 'OLDEST',
  NEWEST = 'NEWEST',
  MASTER = 'MASTER',
  LICENSE = 'LICENSE',
}

registerEnumType(SortOption, {
  name: 'SortOption',
});
