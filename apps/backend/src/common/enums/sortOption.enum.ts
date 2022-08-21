import { registerEnumType } from '@nestjs/graphql';

export enum SortOption {
  NAME = 'NAME',
  OLDEST = 'OLDEST',
  NEWEST = 'NEWEST',
}

registerEnumType(SortOption, {
  name: 'SortOption',
});
