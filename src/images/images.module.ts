// NestJS modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Images module
import { Image } from '@entity/images/image.entity';
import { ImagesService } from './services/images/images.service';
import { ImagesController } from './controllers/images/images.controller';

// Products module
import { ProductsModule } from '@products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), ProductsModule],
  providers: [ImagesService],
  controllers: [ImagesController],
  exports: [ImagesService],
})
export class ImagesModule {}
