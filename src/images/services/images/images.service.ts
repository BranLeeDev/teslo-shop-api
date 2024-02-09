// NestJS modules
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Third-party libraries
import { FindManyOptions, Repository } from 'typeorm';

// Entities
import { Image } from '@entity/images/image.entity';

// DTOs
import { CreateImageDto, UpdateImageDto, FilterImageDto } from '../../dtos';

// Services
import { ProductsService } from '@products/services/products/products.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepo: Repository<Image>,
    private readonly productsService: ProductsService,
  ) {}

  async findAll(filterImageDto?: FilterImageDto) {
    const queryOptions: FindManyOptions = {};

    if (filterImageDto) {
      const { limit, offset } = filterImageDto;
      queryOptions.take = limit ?? 10;
      queryOptions.skip = offset ?? 0;
    }

    return this.imageRepo.find(queryOptions);
  }

  async findImagesByProduct(term: string) {
    const product = await this.productsService.findOne(term, true);
    return product.images;
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
