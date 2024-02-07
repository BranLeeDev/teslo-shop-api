import { Controller, Get } from '@nestjs/common';
import { SeedService } from '../seed-service/seed.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('products')
  async executeSeedForProducts() {
    const res = await this.seedService.runSeedProducts();
    return res;
  }

  @Get('images')
  async executeSeedForImages() {
    const res = await this.seedService.runSeedImages();
    return res;
  }
}
