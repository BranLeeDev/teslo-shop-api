import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { joiConfigSchema } from './libs/joi.lib';
import registers from './environments/register.environment';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [registers],
      isGlobal: true,
      validationSchema: joiConfigSchema,
    }),
    CacheModule.register({
      ttl: 10000,
      max: 10,
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class ConfigModule {}
