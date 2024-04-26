import { createZodDto } from '@anatine/zod-nestjs';
import { ItemSchema } from 'src/generated/zod';

export class CreateItemDto extends createZodDto(
  ItemSchema.pick({ name: true, weight: true }),
) {}
