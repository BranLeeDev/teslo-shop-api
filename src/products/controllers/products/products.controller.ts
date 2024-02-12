// NestJS modules
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiTooManyRequestsResponse,
  ApiCreatedResponse,
  ApiParam,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

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

// Utils
import {
  transformProductFindAll,
  transformProductFindOne,
} from '@products/utils/product.transformer';

@ApiTags('products')
@ApiTooManyRequestsResponse({
  description: 'ThrottlerException: Too Many Requests',
})
@ApiInternalServerErrorResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Internal server error',
})
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve all available products',
    description:
      'Fetches a list of all products currently available in the store',
  })
  @ApiOkResponse({
    description: 'List of products retrieved successfully',
    type: Product,
  })
  async findAll(@Query() filterProductDto: FilterProductDto) {
    try {
      const key = 'products-find-all';
      const productsCached = await this.cacheManager.get(key);

      if (productsCached) return productsCached;

      const res = await this.productsService.findAll(filterProductDto);

      const finalRes = transformProductFindAll(res);

      await this.cacheManager.set(key, finalRes, 1000 * 10);

      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new product',
    description: 'Creates a new product in the store',
  })
  @ApiCreatedResponse({
    type: Product,
    description: 'The product has been successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Invalid request. Please check your input',
  })
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const res = await this.productsService.create(createProductDto);
      return {
        message: 'Product created successfully',
        data: res,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @Get(':term')
  @ApiOperation({
    summary: 'Get a product by id or slug',
    description: 'Retrieves a product using its unique identifier (id) or slug',
  })
  @ApiParam({
    name: 'term',
    description: 'Unique identifier (id) or slug of the product',
    example: 'cotton-t-shirt',
  })
  @ApiOkResponse({
    description: 'Product retrieved successfully',
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
  })
  async findProductByIdOrSlug(@Param('term') term: string) {
    try {
      const key = 'product-find-one';
      const productCached = await this.cacheManager.get(key);

      if (productCached) return productCached;

      const res = await this.productsService.findOne(term, true);

      const finalRes = transformProductFindOne(res);

      await this.cacheManager.set(key, finalRes, 1000 * 10);

      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @Patch(':term')
  @ApiOperation({
    summary: 'Update a product',
    description:
      'Updates an existing product identified by its unique identifier (id) or slug',
  })
  @ApiParam({
    name: 'term',
    description: 'Unique identifier (id) or slug of the product to update',
    example: 'cotton-t-shirt',
  })
  @ApiOkResponse({ description: 'Product updated successfully', type: Product })
  @ApiBadRequestResponse({
    description: 'Invalid request. Please check your input',
  })
  async update(
    @Param('term') term: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const res = await this.productsService.update(term, updateProductDto);
      return {
        message: 'Product updated successfully',
        data: res,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @Delete(':term')
  @ApiOperation({
    summary: 'Delete a product',
    description:
      'Deletes an existing product identified by its unique identifier (id) or slug',
  })
  @ApiParam({
    name: 'term',
    description: 'Unique identifier (id) or slug of the product to delete',
    example: 'cotton-t-shirt',
  })
  @ApiNoContentResponse({
    description: 'No content',
  })
  async delete(@Param('term') term: string) {
    try {
      await this.productsService.delete(term);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
