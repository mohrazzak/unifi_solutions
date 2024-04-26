import { registerAs } from '@nestjs/config';
import { NODE_ENV } from 'src/shared';

export const appConfig = registerAs('app', () => ({
  environment: process.env.NODE_ENV || NODE_ENV.DEVELOPMENT,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL!,
}));
