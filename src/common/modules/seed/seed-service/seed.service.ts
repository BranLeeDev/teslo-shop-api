// NestJS modules
import { BadRequestException, Injectable } from '@nestjs/common';

// Data
import { productsList } from '../data/products.data';
import { productImagesList } from '../data/product-images.data';

// Services
import { ProductsService } from '@products/services/products/products.service';
import { ProductImagesService } from '@images/services/product-images/product-images.service';

@Injectable()
export class SeedService {
  private isSeeded: boolean = false;

  constructor(
    private readonly productsService: ProductsService,
    private readonly productImagesService: ProductImagesService,
  ) {}

  async runSeed() {
    try {
      if (this.isSeeded) {
        throw new BadRequestException(
          'The seed has already been planted previously',
        );
      }

      await this.seedProducts();
      await this.seedImages();

      this.isSeeded = true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async seedImages() {
    try {
      await this.productImagesService.deleteAllImages();
      for (const image of productImagesList) {
        await this.productImagesService.create(image);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async seedProducts() {
    try {
      await this.productsService.deleteAllProducts();
      for (const product of productsList) {
        await this.productsService.create(product);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
