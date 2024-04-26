import { createZodDto } from '@anatine/zod-nestjs';
import { MoverSchema } from 'src/generated/zod';

// in case i want to omit some fields to be returned as a response (I'll parse/strip it using zod if there was any need to)
export const MoverEntitySchema = MoverSchema;

export class MoverEntity extends createZodDto(MoverEntitySchema) {}
