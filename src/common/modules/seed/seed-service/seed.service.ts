// NestJS modules
import { BadRequestException, Injectable } from '@nestjs/common';

// Data
import { productsList } from '../data/products-seed.data';
import { imagesList } from '../data/images-seed.data';

// Services
import { ProductsService } from '@products/services/products/products.service';
import { ImagesService } from '@images/services/images/images.service';

@Injectable()
export class SeedService {
  private isSeeded: boolean = false;

  constructor(
    private readonly productsService: ProductsService,
    private readonly imagesService: ImagesService,
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
      await this.imagesService.deleteAllImages();
      for (const image of imagesList) {
        await this.imagesService.create(image);
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
