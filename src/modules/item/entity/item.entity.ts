import { createZodDto } from '@anatine/zod-nestjs';
import { ItemSchema } from 'src/generated/zod';

export const ItemEntitySchema = ItemSchema;

export class ItemEntity extends createZodDto(ItemEntitySchema) {}
