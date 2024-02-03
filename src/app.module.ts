// NestJS modules
import { Module } from '@nestjs/common';

// Module imports
import { CommonModule } from './common/common.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [CommonModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
