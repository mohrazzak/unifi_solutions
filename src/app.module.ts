import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configOptions, filters, guards, interceptors, pipes } from './shared';
import { ThrottlerModule } from '@nestjs/throttler';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60 * 1000, // * 1 Minute.
        limit: 10,
      },
    ]),
    ConfigModule.forRoot(configOptions),
    ModulesModule,
  ],
  providers: [...guards, ...filters, ...pipes, ...interceptors],
})
export class AppModule {}
