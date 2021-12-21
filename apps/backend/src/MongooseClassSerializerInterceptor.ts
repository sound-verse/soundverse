import { ClassSerializerInterceptor, PlainLiteralObject } from '@nestjs/common';
import { ClassTransformOptions } from 'class-transformer';
import { isObject } from 'class-validator';

export class MongooseClassSerializerInterceptor extends ClassSerializerInterceptor {
  serialize(
    response: PlainLiteralObject | Array<PlainLiteralObject>,
    options: ClassTransformOptions,
  ): PlainLiteralObject | PlainLiteralObject[] {
    const isArray = Array.isArray(response);

    if (!isObject(response) && !isArray) {
      return response;
    }

    return isArray
      ? response.map((item) => this.transformToPlain(item, options))
      : this.transformToPlain(
          (response as any).toJSON ? (response as any).toJSON() : response,
          options,
        );
  }
}
