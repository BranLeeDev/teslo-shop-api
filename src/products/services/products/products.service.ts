// NestJS modules
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Third-party libraries
import { Repository } from 'typeorm';

// Entities
import { Product } from '@entity/products/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}
}
