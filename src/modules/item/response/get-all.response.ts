import { createZodDto } from '@anatine/zod-nestjs';
import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { z } from 'zod';
import { ItemEntitySchema } from '../entity';

export const itemGetAllResponseSchema = z.object({
  categories: z.array(ItemEntitySchema),
});

export const ReturnedGetAllItemResponseSchema = ReturnedResponseSchema.merge(
  z.strictObject({ data: itemGetAllResponseSchema }),
);

export const AppGetAllItemResponseSchema = AppResponseSchema.merge(
  z.object({ data: itemGetAllResponseSchema }),
);

export class ReturnedGetAllItemResponse extends createZodDto(
  ReturnedGetAllItemResponseSchema,
) {}
export class AppGetAllItemResponse extends createZodDto(
  AppGetAllItemResponseSchema,
) {}
