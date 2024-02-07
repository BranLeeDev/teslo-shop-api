import { Module } from '@nestjs/common';
import { ImagesService } from './services/images/images.service';
import { ImagesController } from './controllers/images/images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '@entity/images/image.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), ProductsModule],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
