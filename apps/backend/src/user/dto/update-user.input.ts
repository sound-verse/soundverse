/* eslint-disable @typescript-eslint/no-unsafe-return */
import { InputType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import xss from 'xss';
import { IsOptional, IsUrl, MaxLength, ValidateIf } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Transform(({ value }) => xss(value))
  @Field({ nullable: true })
  email?: string;

  @Transform(({ value }) => xss(value))
  @Field({ nullable: true })
  twitter?: string;

  @Transform(({ value }) => xss(value))
  @Field({ nullable: true })
  instagram?: string;

  @Transform(({ value }) => xss(value))
  @Field({ nullable: true })
  @ValidateIf((schema) => schema.website !== '')
  @IsOptional()
  @IsUrl()
  website?: string;

  @Transform(({ value }) => xss(value))
  @Field({ nullable: true })
  description?: string;

  @Transform(({ value }) => xss(value))
  @Field({ nullable: true })
  @ValidateIf((schema) => !!schema.name)
  @MaxLength(20)
  name?: string;

  @Field({ nullable: true })
  profileImage?: string;

  @Field({ nullable: true })
  profileBanner?: string;
}
