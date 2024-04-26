import { createZodDto } from '@anatine/zod-nestjs';
import * as z from 'zod';
import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';

// the returned response data schema
export const MissionScoreboardResponseSchema = z.object({
  scoreboard: z.array(
    z.object({
      moverId: z.number(),
      completedMissions: z.number(),
    }),
  ),
});

// the returned response schema
export const ReturnedMissionScoreboardResponseSchema =
  ReturnedResponseSchema.merge(
    z.strictObject({
      data: MissionScoreboardResponseSchema,
    }),
  );

// the swagger response schema
export const AppMissionScoreboardResponseSchema = AppResponseSchema.merge(
  z.object({ data: MissionScoreboardResponseSchema }),
);

// the returned response class
export class ReturnedMissionScoreboardResponse extends createZodDto(
  ReturnedMissionScoreboardResponseSchema,
) {}

// the swagger response class
export class AppMissionScoreboardResponse extends createZodDto(
  AppMissionScoreboardResponseSchema,
) {}
