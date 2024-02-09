// NestJS modules
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Services
import { SeedService } from '../seed-service/seed.service';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @HttpCode(HttpStatus.NO_CONTENT)
  async executeSeed() {
    await this.seedService.runSeed();
  }
}
