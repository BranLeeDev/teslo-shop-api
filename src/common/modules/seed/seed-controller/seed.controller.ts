import { Controller, Get } from '@nestjs/common';
import { SeedService } from '../seed-service/seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('products')
  async executeSeed() {
    const res = await this.seedService.runSeed();
    return res;
  }
}
