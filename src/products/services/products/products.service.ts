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

// Models
import { IProductsService } from '../../interfaces/products.interface';

@Injectable()
export class ProductsService implements IProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findAll(filterProductDto?: FilterProductDto): Promise<Product[]> {
    const queryOptions: FindManyOptions<Product> = {
      relations: ['images'],
    };

    if (filterProductDto) {
      const { limit, offset } = filterProductDto;
      queryOptions.take = limit;
      queryOptions.skip = offset;
    }

    const productsList: Product[] = await this.productRepo.find(queryOptions);

    productsList.forEach((product: Product) => {
      product.images = [product.images[0]];
    });

    return productsList;
  }

  async findOne(term: string, hasRelations?: boolean) {
    const product = await this.findProduct(term, hasRelations);
    if (!product) {
      throw new NotFoundException(`Product not found`);
    }
    return product;
  }

  private async findProduct(term: string, hasRelations?: boolean) {
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
  }

  async create(createProductDto: CreateProductDto) {
    const newProduct: Product = this.productRepo.create(createProductDto);
    return this.productRepo.save(newProduct);
  }

  async update(term: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(term);
    this.productRepo.merge(product, updateProductDto);
    return this.productRepo.save(product);
  }

  async delete(term: string) {
    const product = await this.findOne(term);
    await this.productRepo.delete(product.id);
  }

  async deleteAllProducts() {
    await this.productRepo.delete({});
  }
}
