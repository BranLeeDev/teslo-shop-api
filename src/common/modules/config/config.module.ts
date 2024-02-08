import { Module } from '@nestjs/common';
import { ConfigType, ConfigModule as NestConfigModule } from '@nestjs/config';
import { joiConfigSchema } from './libs/joi.lib';
import registers from './environments/register.environment';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import register from './environments/register.environment';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

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
        store: await redisStore({
          socket: {
            host: registerService.redis.host,
            port: registerService.redis.port,
          },
          password: registerService.redis.password,
        }),
      }),
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 1000 * 6,
        limit: 7,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ConfigModule {}
