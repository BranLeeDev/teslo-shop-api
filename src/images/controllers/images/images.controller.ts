// NestJS modules
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

// Entities
import { Image } from '@entity/images/image.entity';

// DTOs
import { CreateImageDto, UpdateImageDto } from '../../dtos';

// Services
import { ImagesService } from '../../services/images/images.service';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all images' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [Image] })
  async getAllImages() {
    return this.imagesService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new image' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    type: Image,
  })
  async createImage(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Patch(':imageId')
  @ApiOperation({ summary: 'Update an image' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Updated', type: Image })
  async updateImage(
    @Param('imageId', ParseIntPipe) imageId: number,
    @Body() updateImageDto: UpdateImageDto,
  ) {
    return this.imagesService.update(imageId, updateImageDto);
  }

  @Delete(':imageId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an image' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Deleted' })
  async deleteImage(@Param('imageId', ParseIntPipe) imageId: number) {
    await this.imagesService.delete(imageId);
  }
}
