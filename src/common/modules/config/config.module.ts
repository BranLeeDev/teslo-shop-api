import { Module } from '@nestjs/common';
import { ConfigType, ConfigModule as NestConfigModule } from '@nestjs/config';
import { joiConfigSchema } from './libs/joi.lib';
import registers from './environments/register.environment';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { redisStore } from 'cache-manager-redis-yet';
import register from './environments/register.environment';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [registers],
      isGlobal: true,
      validationSchema: joiConfigSchema,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [register.KEY],
      useFactory: async (registerService: ConfigType<typeof register>) => ({
        ttl: 10000,
        max: 10,
        store: await redisStore({
          socket: {
            host: registerService.redis.host,
            port: registerService.redis.port,
          },
          password: registerService.redis.password,
        }),
      }),
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
