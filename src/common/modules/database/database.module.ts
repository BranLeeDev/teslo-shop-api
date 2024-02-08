// NestJS modules
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';

// Env config
import register from '@env/register.environment';
import { ENV, isProd } from '@env/variables.environment';

// Entities
import { Image } from '@entity/images/image.entity';
import { Product } from '@entity/products/product.entity';

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
          synchronize: true,
          entities: [Product, Image],
          ssl: isProd,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
