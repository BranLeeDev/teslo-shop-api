import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products/products.service';
import { productsList } from '../data/products-seed.data';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}

  async runSeed(): Promise<string> {
    await this.insertNewProducts();

    return 'Database seeded with initial products successfully!';
  }

  private async insertNewProducts(): Promise<void> {
    await this.productsService.deleteAllProducts();

    for (const product of productsList) {
      await this.productsService.create(product);
    }
  }
}
