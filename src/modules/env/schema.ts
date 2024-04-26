import { NODE_ENV } from 'src/shared';
import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.nativeEnum(NODE_ENV),
  DATABASE_URL: z.string(),
});

export type Env = z.infer<typeof envSchema>;
