// NestJS modules
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
} from 'src/products/dtos';

// Services
import { ProductsService } from '../../services/products/products.service';

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
    const createdProduct = await this.productsService.create(createProductDto);
    return {
      message: 'Product created successfully',
      data: createdProduct,
    };
  }

  @Get(':term')
  async findProductByIdOrSlug(@Param('term') term: string): Promise<Product> {
    const res = await this.productsService.findOne(term);
    return res;
  }

  @Patch(':productId')
  async update(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<{ message: string; data: Product }> {
    const updatedProduct = await this.productsService.update(
      productId,
      updateProductDto,
    );
    return {
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  @Delete(':productId')
  async delete(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<{ message: string; data: Product }> {
    const deletedProduct = await this.productsService.delete(productId);
    return {
      message: 'Product deleted successfully',
      data: deletedProduct,
    };
  }
}
