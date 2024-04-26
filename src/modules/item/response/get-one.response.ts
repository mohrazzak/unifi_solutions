import { createZodDto } from '@anatine/zod-nestjs';
import * as z from 'zod';
import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { ItemEntitySchema } from '../entity';

export const itemGetOneResponseSchema = z.object({
  item: ItemEntitySchema,
});

export const ReturnedItemResponseSchema = ReturnedResponseSchema.merge(
  z.strictObject({
    data: itemGetOneResponseSchema,
  }),
);

export const AppItemResponseSchema = AppResponseSchema.merge(
  z.object({ data: itemGetOneResponseSchema }),
);

export class ReturnedItemResponse extends createZodDto(
  ReturnedItemResponseSchema,
) {}
export class AppItemResponse extends createZodDto(AppItemResponseSchema) {}
