// NestJS modules
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      const queryOptions: FindManyOptions<Image> = {
        relations: ['product'],
      };

      if (filterImageDto) {
        const { limit, offset } = filterImageDto;
        queryOptions.take = limit ?? 10;
        queryOptions.skip = offset ?? 0;
      }

      const imagesList = await this.imageRepo.find(queryOptions);
      return imagesList;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async create(createImageDto: CreateImageDto) {
    try {
      const newImage = this.imageRepo.create(createImageDto);
      if (createImageDto.productId) {
        const product = await this.productsService.findOne(
          String(createImageDto.productId),
        );
        newImage.product = product;
      }
      const createdImage = await this.imageRepo.save(newImage);
      return createdImage;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async findImageById(imageId: number) {
    try {
      const image = await this.imageRepo.findOneBy({ id: imageId });
      if (!image)
        throw new NotFoundException(`Image with id ${imageId} not found`);
      return image;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(imageId: number, updateImageDto: UpdateImageDto) {
    try {
      const imageFound = await this.findImageById(imageId);
      if (updateImageDto.productId) {
        const product = await this.productsService.findOne(
          String(updateImageDto.productId),
        );
        imageFound.product = product;
      }
      this.imageRepo.merge(imageFound, updateImageDto);
      const updatedImage = await this.imageRepo.save(imageFound);
      return updatedImage;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(imageId: number) {
    try {
      await this.findImageById(imageId);
      await this.imageRepo.delete(imageId);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteAllImages() {
    try {
      await this.imageRepo.delete({});
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
