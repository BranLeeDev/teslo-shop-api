// Node modules
import { join } from 'path';

// NestJS modules
import { Module } from '@nestjs/common';

// Module imports
import { CommonModule } from './common/common.module';
import { ProductsModule } from './products/products.module';
import { ImagesModule } from './images/images.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      serveRoot: '/',
    }),
    CommonModule,
    ProductsModule,
    ImagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
