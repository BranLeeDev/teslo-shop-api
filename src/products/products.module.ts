// NestJS modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Products
import { Product } from '@entity/products/product.entity';
import { ProductsService } from './services/products/products.service';
import { ProductsController } from './controllers/products/products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
