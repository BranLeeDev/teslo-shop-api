// NestJS modules
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

// Services
import { SeedService } from '../seed-service/seed.service';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Execute seed data generation',
    description: 'Generates and inserts seed data into the database.',
  })
  @ApiNoContentResponse({
    description: 'Seed data generation executed successfully',
  })
  @ApiBadRequestResponse({
    description: 'The seed has already been planted previously',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async executeSeed() {
    try {
      await this.seedService.runSeed();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
