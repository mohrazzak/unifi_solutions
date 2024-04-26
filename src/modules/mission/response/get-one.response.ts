import { createZodDto } from '@anatine/zod-nestjs';
import * as z from 'zod';
import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { MissionEntitySchema } from '../entity';

// the returned response data schema
export const missionGetOneResponseSchema = z.object({
  mission: MissionEntitySchema,
});

// the returned response schema
export const ReturnedMissionResponseSchema = ReturnedResponseSchema.merge(
  z.strictObject({
    data: missionGetOneResponseSchema,
  }),
);

// the swagger response schema
export const AppMissionResponseSchema = AppResponseSchema.merge(
  z.object({ data: missionGetOneResponseSchema }),
);

// the returned response class
export class ReturnedMissionResponse extends createZodDto(
  ReturnedMissionResponseSchema,
) {}

// the swagger response class
export class AppMissionResponse extends createZodDto(
  AppMissionResponseSchema,
) {}
