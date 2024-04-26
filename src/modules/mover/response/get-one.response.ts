import { createZodDto } from '@anatine/zod-nestjs';
import * as z from 'zod';
import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { MoverEntitySchema } from '../entity';

// the returned response data schema
export const MoverGetOneResponseSchema = z.object({
  mover: MoverEntitySchema,
});

// the returned response schema
export const ReturnedMoverResponseSchema = ReturnedResponseSchema.merge(
  z.strictObject({
    data: MoverGetOneResponseSchema,
  }),
);

// the swagger response schema
export const AppMoverResponseSchema = AppResponseSchema.merge(
  z.object({ data: MoverGetOneResponseSchema }),
);

// the returned response class
export class ReturnedMoverResponse extends createZodDto(
  ReturnedMoverResponseSchema,
) {}

// the swagger response class
export class AppMoverResponse extends createZodDto(AppMoverResponseSchema) {}
