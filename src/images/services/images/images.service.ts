// NestJS modules
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Third-party libraries
import { Repository } from 'typeorm';

// Entities
import { Image } from '@entity/images/image.entity';

// DTOs
import { CreateImageDto, UpdateImageDto } from '../../dtos';

// Models
import { IImagesService } from 'src/images/interfaces/images.interface';

// Services
import { ProductsService } from '../../../products/services/products/products.service';

@Injectable()
export class ImagesService implements IImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepo: Repository<Image>,
    private readonly productsService: ProductsService,
  ) {}

  async findAll() {
    return this.imageRepo.find();
  }

  async create(createImageDto: CreateImageDto) {
    const newImage = this.imageRepo.create(createImageDto);
    if (createImageDto.productId) {
      const product = await this.productsService.findOne(
        String(createImageDto.productId),
      );
      newImage.product = product;
    }
    return this.imageRepo.save(newImage);
  }

  private async findImageById(imageId: number) {
    const image = await this.imageRepo.findOneBy({ id: imageId });
    if (!image)
      throw new NotFoundException(`Image with id ${imageId} not found`);
    return image;
  }

  async update(imageId: number, updateImageDto: UpdateImageDto) {
    const imageFound = await this.findImageById(imageId);
    if (updateImageDto.productId) {
      const product = await this.productsService.findOne(
        String(updateImageDto.productId),
      );
      imageFound.product = product;
    }
    this.imageRepo.merge(imageFound, updateImageDto);
    return this.imageRepo.save(imageFound);
  }

  async delete(imageId: number) {
    await this.findImageById(imageId);
    await this.imageRepo.delete(imageId);
  }

  async deleteAllImages() {
    await this.imageRepo.delete({});
  }
}
