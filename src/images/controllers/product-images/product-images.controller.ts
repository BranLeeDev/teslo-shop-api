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
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
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
  ApiConsumes,
  ApiBody,
  ApiUnprocessableEntityResponse,
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
import { ImagesService } from 'src/cloudinary/services/images/images.service';
import { FileUploadDto } from '@cloudinary/dtos/file-upload.dto';
import {
  FileInterceptor,
  MemoryStorageFile,
  UploadedFile,
} from '@blazity/nest-file-fastify';

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
    private readonly productImagesService: ProductImagesService,
    private readonly imagesService: ImagesService,
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

      const res = await this.productImagesService.findAll(
        filterProductImageDto,
      );

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
      const res = await this.productImagesService.create(createProductImageDto);
      return {
        message: 'Product image created successfully',
        data: res,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @Post('products/:term')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Add an image to a product',
    description:
      'Uploads the image to Cloudinary and automatically associates it with a product. The endpoint accepts images of type jpg and jpeg with a maximum size of 150KB. It is advisable to update the default description that comes with the alt attribute of the image',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file',
    type: FileUploadDto,
  })
  @ApiUnprocessableEntityResponse({
    description: 'The file is invalid or its name is incorrect',
  })
  @ApiBadRequestResponse({
    description: 'Invalid or incorrect field provided for the file',
  })
  @UseInterceptors(FileInterceptor('image'))
  async addImageToProduct(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg)$/,
        })
        .addMaxSizeValidator({
          maxSize: 153600,
          message: 'Image size must not exceed 150 KB',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    image: MemoryStorageFile,
    @Param('term') term: string,
  ) {
    try {
      const res = await this.productImagesService.addImageToProduct(
        image,
        term,
      );
      return res;
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
      const res = await this.productImagesService.update(
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
      await this.productImagesService.delete(imageId);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
