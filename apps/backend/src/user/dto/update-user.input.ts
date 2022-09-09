/* eslint-disable @typescript-eslint/no-unsafe-return */
import { InputType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import xss from 'xss';
import { IsOptional, IsUrl, MaxLength, ValidateIf } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Transform(({ value }) => xss(value))
  @MaxLength(250, {
    message: 'Twitter is too long',
  })
  @Field({ nullable: true })
  twitter?: string;

  @Transform(({ value }) => xss(value))
  @MaxLength(250, {
    message: 'Instagram is too long',
  })
  @Field({ nullable: true })
  instagram?: string;

  @Transform(({ value }) => xss(value))
  @MaxLength(250, {
    message: 'Soundcloud is too long',
  })
  @Field({ nullable: true })
  soundcloud?: string;

  @Transform(({ value }) => xss(value))
  @MaxLength(250, {
    message: 'Discord is too long',
  })
  @Field({ nullable: true })
  discord?: string;

  @Transform(({ value }) => xss(value))
  @MaxLength(250, {
    message: 'Spotify is too long',
  })
  @Field({ nullable: true })
  spotify?: string;

  @Transform(({ value }) => xss(value))
  @Field({ nullable: true })
  @ValidateIf((schema) => schema.website !== '')
  @IsOptional()
  @MaxLength(500, {
    message: 'Website is too long',
  })
  @IsUrl()
  website?: string;

  @Transform(({ value }) => xss(value))
  @MaxLength(1000, {
    message: 'Description is too long',
  })
  @Field({ nullable: true })
  description?: string;

  @Transform(({ value }) => xss(value))
  @MaxLength(30, {
    message: 'Name is too long',
  })
  @Field({ nullable: true })
  @ValidateIf((schema) => !!schema.name)
  name?: string;
}
