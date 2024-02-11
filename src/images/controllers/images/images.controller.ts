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
} from '@nestjs/swagger';

// Entities
import { Image } from '@entity/images/image.entity';

// DTOs
import { CreateImageDto, FilterImageDto, UpdateImageDto } from '../../dtos';

// Services
import { ImagesService } from '@images/services/images/images.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { transformImageFindAll } from '@images/utils/image.transformer';

@ApiTags('images')
@ApiInternalServerErrorResponse({
  description: 'Internal server error',
})
@Controller('images')
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve all images',
    description: 'Fetches a list of all images',
  })
  @ApiOkResponse({
    description: 'List of images retrieved successfully',
    type: [Image],
  })
  async getAllImages(@Query() filterImageDto: FilterImageDto) {
    try {
      const key = 'images-find-all';

      const imageCached = await this.cacheManager.get(key);

      if (imageCached) return imageCached;

      const res = await this.imagesService.findAll(filterImageDto);

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
    summary: 'Create a new image',
    description: 'Endpoint to create a new image',
  })
  @ApiCreatedResponse({
    description: 'Image created successfully',
    type: Image,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request. Please check your input',
  })
  async createImage(@Body() createImageDto: CreateImageDto) {
    try {
      const res = await this.imagesService.create(createImageDto);
      return {
        message: 'Image created successfully',
        data: res,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @Patch(':imageId')
  @ApiOperation({ summary: 'Update an image' })
  @ApiParam({
    name: 'imageId',
    description: 'The ID of the image to update',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Image updated successfully',
    type: Image,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request. Please check your input',
  })
  async updateImage(
    @Param('imageId', ParseIntPipe) imageId: number,
    @Body() updateImageDto: UpdateImageDto,
  ) {
    try {
      const res = await this.imagesService.update(imageId, updateImageDto);
      return {
        message: 'Image updated successfully',
        data: res,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @Delete(':imageId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete an image',
    description: 'Deletes the image with the specified ID',
  })
  @ApiParam({
    name: 'imageId',
    description: 'The ID of the image to delete',
    example: 1,
  })
  @ApiNoContentResponse({ description: 'Image successfully deleted' })
  async deleteImage(@Param('imageId', ParseIntPipe) imageId: number) {
    try {
      await this.imagesService.delete(imageId);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
