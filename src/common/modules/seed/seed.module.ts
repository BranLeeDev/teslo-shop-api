import { Module } from '@nestjs/common';
import { SeedService } from './seed-service/seed.service';
import { SeedController } from './seed-controller/seed.controller';
import { ProductsModule } from '../../../products/products.module';

@Module({
  imports: [ProductsModule],
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule {}
