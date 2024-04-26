import { createZodDto } from '@anatine/zod-nestjs';
import { MissionSchema } from 'src/generated/zod';

export class StartMissionDto extends createZodDto(
  MissionSchema.pick({ moverId: true }),
) {}
