import { createZodDto } from '@anatine/zod-nestjs';
import { MoverSchema } from 'src/generated/zod';

export class CreateMoverDto extends createZodDto(
  MoverSchema.pick({ energy: true, weightLimit: true }),
) {}
