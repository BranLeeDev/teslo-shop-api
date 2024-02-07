// NestJS modules
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

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

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [Product],
  })
  async findAll(@Query() filterProductDto: FilterProductDto) {
    return this.productsService.findAll(filterProductDto);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    type: Product,
  })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get(':term')
  @ApiOperation({ summary: 'Get a product by id or slug' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Product })
  async findProductByIdOrSlug(@Param('term') term: string) {
    return this.productsService.findOne(term, true);
  }

  @Patch(':term')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Updated', type: Product })
  async update(
    @Param('term') term: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(term, updateProductDto);
  }

  @Delete(':term')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Deleted',
    type: Product,
  })
  async delete(@Param('term') term: string) {
    await this.productsService.delete(term);
  }
}
