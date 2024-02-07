import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { joiConfigSchema } from './libs/joi.lib';
import registers from './environments/register.environment';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [registers],
      isGlobal: true,
      validationSchema: joiConfigSchema,
    }),
  ],
})
export class ConfigModule {}
