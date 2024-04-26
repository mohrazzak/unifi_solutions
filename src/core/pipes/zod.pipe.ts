import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ZodDtoStatic } from '@anatine/zod-nestjs';
import { HTTP_ERRORS_BY_CODE } from '@anatine/zod-nestjs/src/lib/http-errors';
import { ValidationException } from '../exceptions';

export interface ZodValidationPipeOptions {
  errorHttpStatusCode?: keyof typeof HTTP_ERRORS_BY_CODE;
}

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  transform(value: object, metadata: ArgumentMetadata): unknown {
    const zodSchema = (metadata?.metatype as ZodDtoStatic)?.zodSchema;
    if (!zodSchema) {
      return value;
    }

    const parseResult = zodSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data;
    }

    const { error } = parseResult;
    const errorMessage = error.errors.map(
      (err: any) => `${err.path}: ${err.message}`,
    );

    throw new ValidationException(errorMessage);
  }
}
