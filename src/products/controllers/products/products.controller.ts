// NestJS modules
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

// Entities
import { Product } from '@entity/products/product.entity';

// DTOs
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../../dtos';

// Services
import { ProductsService } from '../../services/products/products.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(
    @Query() filterProductDto: FilterProductDto,
  ): Promise<Product[]> {
    const res = await this.productsService.findAll(filterProductDto);
    return res;
  }

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<{ message: string; data: Product }> {
    const res = await this.productsService.create(createProductDto);
    return {
      message: 'Product created successfully',
      data: res,
    };
  }

  @Get(':term')
  async findProductByIdOrSlug(@Param('term') term: string): Promise<Product> {
    const res = await this.productsService.findOne(term, true);
    return res;
  }

  @Patch(':term')
  async update(
    @Param('term') term: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<{ message: string; data: Product }> {
    const res = await this.productsService.update(term, updateProductDto);
    return {
      message: 'Product updated successfully',
      data: res,
    };
  }

  @Delete(':term')
  async delete(
    @Param('term') term: string,
  ): Promise<{ message: string; data: Product }> {
    const res = await this.productsService.delete(term);
    return {
      message: 'Product deleted successfully',
      data: res,
    };
  }
}
