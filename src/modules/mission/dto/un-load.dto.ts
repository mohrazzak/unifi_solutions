import { createZodDto } from '@anatine/zod-nestjs';
import { MissionSchema } from 'src/generated/zod';

export class UnLoadMissionDto extends createZodDto(
  MissionSchema.pick({ moverId: true }),
) {}
