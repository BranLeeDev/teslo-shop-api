import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products/products.service';
import { productsList } from '../data/products-seed.data';
import { ImagesService } from 'src/images/services/images/images.service';
import { imagesList } from '../data/images-seed.data';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly imagesService: ImagesService,
  ) {}

  async runSeedProducts(): Promise<string> {
    await this.insertNewProducts();

    return 'Database seeded with initial products successfully!';
  }

  async runSeedImages(): Promise<string> {
    await this.insertNewImages();

    return 'Database seeded with initial images successfully!';
  }

  private async insertNewImages() {
    await this.imagesService.deleteAllImages();

    for (const image of imagesList) {
      await this.imagesService.create(image);
    }
  }

  private async insertNewProducts(): Promise<void> {
    await this.productsService.deleteAllProducts();

    for (const product of productsList) {
      await this.productsService.create(product);
    }
  }
}