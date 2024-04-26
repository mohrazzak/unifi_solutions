import { ConfigModuleOptions } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';
import { appConfig } from 'src/core/configs';
import { envSchema } from '../../modules/env/schema';
export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: [appConfig],
  cache: true,
  validate: envSchema.parse,
  validationOptions: { abortEarly: true },
  envFilePath: `${process.cwd()}/src/core/configs/env/.env.${
    process.env.NODE_ENV
  }`,
  expandVariables: true,
};

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Unifi solutions Task Docs')
  .setDescription('By Mohammad Abdalrazzak')
  .setVersion('0.1')
  .build();
