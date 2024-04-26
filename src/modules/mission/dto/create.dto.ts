import { createZodDto } from '@anatine/zod-nestjs';
import { MissionSchema } from 'src/generated/zod';
import { z } from 'zod';

export class CreateMissionDto extends createZodDto(
  MissionSchema.pick({ moverId: true }).merge(
    z.object({ items: z.array(z.number()) }),
  ),
) {}
