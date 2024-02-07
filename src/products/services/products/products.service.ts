// NestJS modules
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Third-party libraries
import { Repository, FindManyOptions } from 'typeorm';

// Models
import { IProductsService } from '../../interfaces/products.interface';

// Entities
import { Product } from '@entity/products/product.entity';

// DTOs
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../../dtos/index';

@Injectable()
export class ProductsService implements IProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findAll(filterProductDto?: FilterProductDto): Promise<Product[]> {
    const queryOptions: FindManyOptions<Product> = {};
    if (filterProductDto) {
      const { limit, offset } = filterProductDto;
      queryOptions.take = limit;
      queryOptions.skip = offset;
    }
    const productsList = await this.productRepo.find(queryOptions);
    return productsList;
  }

  async findOne(term: string): Promise<Product> {
    const productId = Number(term);
    if (!isNaN(productId)) {
      const product = await this.findProductById(productId);
      return product;
    } else {
      const product = await this.findProductBySlug(term);
      return product;
    }
  }

  private async findProductById(productId: number): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product;
  }

  private async findProductBySlug(slug: string): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { slug } });
    if (!product) {
      throw new NotFoundException(`Product with slug ${slug} not found`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepo.create(createProductDto);
    const createdProduct = await this.productRepo.save(newProduct);
    return createdProduct;
  }

  async update(
    term: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(term);
    this.productRepo.merge(product, updateProductDto);
    const updatedProduct = await this.productRepo.save(product);
    return updatedProduct;
  }

  async delete(term: string): Promise<Product> {
    const product = await this.findOne(term);
    const productId = product.id;
    await this.productRepo.delete(productId);
    return product;
  }
}
