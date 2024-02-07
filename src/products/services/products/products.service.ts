// NestJS modules
import { Injectable } from '@nestjs/common';
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

  async findOne(term: string, hasRelations?: boolean): Promise<Product> {
    let relations: string[] = [];
    let product: Product;
    const productId = Number(term);

    if (hasRelations) {
      relations = ['images'];
    }

    if (!isNaN(productId)) {
      product = await this.productRepo.findOneOrFail({
        where: {
          id: productId,
        },
        relations,
      });
    } else {
      product = await this.productRepo.findOneOrFail({
        where: {
          slug: term,
        },
        relations,
      });
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

  async deleteAllProducts() {
    await this.productRepo.delete({});
  }
}
