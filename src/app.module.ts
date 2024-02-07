// NestJS modules
import { Module } from '@nestjs/common';

// Module imports
import { CommonModule } from './common/common.module';
import { ProductsModule } from './products/products.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [CommonModule, ProductsModule, ImagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
