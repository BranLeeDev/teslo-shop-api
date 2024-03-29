// NestJS modules
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Third-party libraries
import { FindManyOptions, Repository } from 'typeorm';

// Entities
import { ProductImage } from '@entity/images/product-image.entity';

// DTOs
import {
  CreateProductImageDto,
  UpdateProductImageDto,
  FilterProductImageDto,
} from '../../dtos';

// Services
import { ProductsService } from '@products/services/products/products.service';
import { ImagesService } from '@cloudinary/services/images/images.service';
import { MemoryStorageFile } from '@blazity/nest-file-fastify';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepo: Repository<ProductImage>,
    private readonly productsService: ProductsService,
    private readonly imagesService: ImagesService,
  ) {}

  async findAll(filterImageDto?: FilterProductImageDto) {
    try {
      const queryOptions: FindManyOptions<ProductImage> = {
        relations: ['product'],
      };

      if (filterImageDto) {
        const { limit, offset } = filterImageDto;
        queryOptions.take = limit ?? 10;
        queryOptions.skip = offset ?? 0;
      }

      const imagesList = await this.productImageRepo.find(queryOptions);
      return imagesList;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async create(createProductImageDto: CreateProductImageDto) {
    try {
      const newImage = this.productImageRepo.create(createProductImageDto);
      if (createProductImageDto.publicId) {
        await this.imagesService.checkPublicIdInCloudinary(
          createProductImageDto.publicId,
        );
      }
      if (createProductImageDto.productId) {
        const product = await this.productsService.findOne(
          String(createProductImageDto.productId),
        );
        newImage.product = product;
      }
      const createdImage = await this.productImageRepo.save(newImage);
      return createdImage;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async addImageToProduct(image: MemoryStorageFile, term: string) {
    try {
      const uploadedImage = await this.imagesService.uploadImage(image);
      const product = await this.productsService.findOne(term);
      const createProductImageDto: CreateProductImageDto = {
        ...uploadedImage,
        productId: product.id,
      };
      const createdProductImage = await this.create(createProductImageDto);
      return createdProductImage;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async findImageById(imageId: number) {
    try {
      const image = await this.productImageRepo.findOneBy({ id: imageId });
      if (!image)
        throw new NotFoundException(`Image with id ${imageId} not found`);
      return image;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(imageId: number, updateImageDto: UpdateProductImageDto) {
    try {
      const imageFound = await this.findImageById(imageId);
      if (updateImageDto.productId) {
        const product = await this.productsService.findOne(
          String(updateImageDto.productId),
        );
        imageFound.product = product;
      }
      this.productImageRepo.merge(imageFound, updateImageDto);
      const updatedImage = await this.productImageRepo.save(imageFound);
      return updatedImage;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(imageId: number) {
    try {
      await this.productImageRepo.delete(imageId);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
