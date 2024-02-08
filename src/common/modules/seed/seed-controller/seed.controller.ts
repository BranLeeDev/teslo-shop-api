import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { SeedService } from '../seed-service/seed.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('products')
  async executeSeedForProducts() {
    await this.seedService.runSeedProducts();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('images')
  async executeSeedForImages() {
    await this.seedService.runSeedImages();
  }
}
