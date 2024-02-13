// NestJS modules
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Third-party libraries
import { Repository, FindManyOptions } from 'typeorm';

// Entities
import { Product } from '@entity/products/product.entity';

// DTOs
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../../dtos/index';
import { ImagesService } from '@cloudinary/services/images/images.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private readonly imagesService: ImagesService,
  ) {}

  async findAll(filterProductDto?: FilterProductDto) {
    try {
      const queryOptions: FindManyOptions<Product> = {};

      if (filterProductDto) {
        const { limit, offset } = filterProductDto;
        queryOptions.take = limit ?? 10;
        queryOptions.skip = offset ?? 0;
      }

      const productsList = await this.productRepo.find(queryOptions);

      return productsList;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne(term: string, hasRelations?: boolean) {
    try {
      const product = await this.findProduct(term, hasRelations);
      if (!product) {
        throw new NotFoundException(`Product not found`);
      }
      return product;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async findProduct(term: string, hasRelations?: boolean) {
    try {
      const relations: string[] = hasRelations ? ['images'] : [];
      const productId: number = Number(term);

      if (!isNaN(productId)) {
        return this.productRepo.findOne({
          where: { id: productId },
          relations,
        });
      } else {
        return this.productRepo.findOne({
          where: { slug: term },
          relations,
        });
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct: Product = this.productRepo.create(createProductDto);
      const createdProduct = await this.productRepo.save(newProduct);
      return createdProduct;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(term: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.findOne(term);
      this.productRepo.merge(product, updateProductDto);
      const updatedProduct = await this.productRepo.save(product);
      return updatedProduct;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(term: string) {
    try {
      const product = await this.findOne(term, true);

      for (const image of product.images) {
        if (image.publicId) {
          await this.imagesService.destroyImage(image.publicId);
        }
      }

      await this.productRepo.delete(product.id);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
