import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import register from '../config/environments/register.environment';
import { ENV, isProd } from '../config/environments/variables.environment';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [register.KEY],
      useFactory: (registerService: ConfigType<typeof register>) => {
        let DATABASE_URL: string;

        if (ENV === 'production') {
          DATABASE_URL = registerService.db.postgres.url as string;
        } else {
          const { user, password, host, port, name } =
            registerService.db.postgres;

          const USER = encodeURIComponent(user as string);
          const PASSWORD = encodeURIComponent(password as string);

          DATABASE_URL = `postgres://${USER}:${PASSWORD}@${host}:${port}/${name}`;
        }

        return {
          type: 'postgres',
          url: DATABASE_URL,
          synchronize: !isProd,
          autoLoadEntities: true,
          ssl: isProd,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
