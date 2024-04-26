import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import expressBasicAuth from 'express-basic-auth';
import { SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';
import { TimeoutInterceptor } from './core';
import { swaggerOptions } from './shared';
import { EnvService } from './modules/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    '/docs*',
    expressBasicAuth({
      challenge: true,
      users: {
        admin: 'admin',
      },
      unauthorizedResponse: {
        message: 'unauthorized',
      },
    }),
  );

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, swaggerDocument);
  app.enableCors();

  app.use(compression());
  app.use(helmet());

  app.useGlobalInterceptors(new TimeoutInterceptor());

  const configService = app.get(EnvService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
