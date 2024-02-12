// NestJS modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Images module
import { ProductImage } from '@entity/images/product-image.entity';
import { ProductImagesService } from './services/product-images/product-images.service';
import { ProductImagesController } from './controllers/product-images/product-images.controller';

// Products module
import { ProductsModule } from '@products/products.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductImage]),
    ProductsModule,
    CloudinaryModule,
  ],
  providers: [ProductImagesService],
  controllers: [ProductImagesController],
  exports: [ProductImagesService],
})
export class ImagesModule {}
