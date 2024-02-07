import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '@entity/images/image.entity';
import { CreateImageDto } from '../../dtos';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/services/products/products.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepo: Repository<Image>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createImageDto: CreateImageDto) {
    const newImage = this.imageRepo.create(createImageDto);
    if (createImageDto.productId) {
      const product = await this.productsService.findOne(
        String(createImageDto.productId),
      );
      newImage.product = product;
    }
    const createdImage = await this.imageRepo.save(newImage);
    return createdImage;
  }
}
