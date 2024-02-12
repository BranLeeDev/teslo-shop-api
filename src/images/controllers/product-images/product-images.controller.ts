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
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';

// Entities
import { ProductImage } from '@entity/images/product-image.entity';

// DTOs
import {
  CreateProductImageDto,
  FilterProductImageDto,
  UpdateProductImageDto,
} from '../../dtos';

// Services
import { ProductImagesService } from '@images/services/product-images/product-images.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { transformImageFindAll } from '@images/utils/image.transformer';

@ApiTags('product-images')
@ApiTooManyRequestsResponse({
  description: 'ThrottlerException: Too Many Requests',
})
@ApiInternalServerErrorResponse({
  description: 'Internal server error',
})
@Controller('product-images')
export class ProductImagesController {
  constructor(
    private readonly imagesService: ProductImagesService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve all product images',
    description: 'Fetches a list of all product images',
  })
  @ApiOkResponse({
    description: 'List of product images retrieved successfully',
    type: [ProductImage],
  })
  async getAllImages(@Query() filterProductImageDto: FilterProductImageDto) {
    try {
      const key = 'images-find-all';

      const imageCached = await this.cacheManager.get(key);

      if (imageCached) return imageCached;

      const res = await this.imagesService.findAll(filterProductImageDto);

      const finalRes = transformImageFindAll(res);

      await this.cacheManager.set(key, finalRes, 1000 * 10);

      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new product image',
    description: 'Endpoint to create a new product image',
  })
  @ApiCreatedResponse({
    description: 'Product image created successfully',
    type: ProductImage,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request. Please check your input',
  })
  async createImage(@Body() createProductImageDto: CreateProductImageDto) {
    try {
      const res = await this.imagesService.create(createProductImageDto);
      return {
        message: 'Product image created successfully',
        data: res,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @Patch(':imageId')
  @ApiOperation({ summary: 'Update a product image' })
  @ApiParam({
    name: 'imageId',
    description: 'The ID of the product image to update',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Product image updated successfully',
    type: ProductImage,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request. Please check your input',
  })
  async updateImage(
    @Param('imageId', ParseIntPipe) imageId: number,
    @Body() updateProductImageDto: UpdateProductImageDto,
  ) {
    try {
      const res = await this.imagesService.update(
        imageId,
        updateProductImageDto,
      );
      return {
        message: 'Product image updated successfully',
        data: res,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @Delete(':imageId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a product image',
    description: 'Deletes the product image with the specified ID',
  })
  @ApiParam({
    name: 'imageId',
    description: 'The ID of the product image to delete',
    example: 1,
  })
  @ApiNoContentResponse({ description: 'Product image successfully deleted' })
  async deleteImage(@Param('imageId', ParseIntPipe) imageId: number) {
    try {
      await this.imagesService.delete(imageId);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
