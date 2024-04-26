import { createZodDto } from '@anatine/zod-nestjs';
import { ItemSchema } from 'src/generated/zod';

// in case i want to omit some fields to be returned as a response (I'll parse/strip it using zod if there was any need to)
export const MissionEntitySchema = ItemSchema;

export class MissionEntity extends createZodDto(MissionEntitySchema) {}
