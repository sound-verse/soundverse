import { Field, InputType } from '@nestjs/graphql';
import { SortOption } from '../../../common/enums/sortOption.enum';

@InputType()
export class NftsFilter {
  @Field({ nullable: true })
  hasSelling?: boolean;

  @Field(() => SortOption, { nullable: true })
  sortOption?: SortOption;
}
