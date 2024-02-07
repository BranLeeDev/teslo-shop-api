import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateImageDto } from 'src/images/dtos';
import { UpdateImageDto } from 'src/images/dtos/images/update-image.dto';
import { ImagesService } from 'src/images/services/images/images.service';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  async getAllImages() {
    const res = await this.imagesService.findAll();
    return res;
  }

  @Post()
  async createImage(@Body() createImageDto: CreateImageDto) {
    const res = await this.imagesService.create(createImageDto);
    return {
      message: 'Image created successfully',
      data: res,
    };
  }

  @Patch(':imageId')
  async updateImage(
    @Param('imageId', ParseIntPipe) imageId: number,
    @Body() updateImageDto: UpdateImageDto,
  ) {
    const res = await this.imagesService.update(imageId, updateImageDto);
    return {
      message: 'Image updated successfully',
      data: res,
    };
  }

  @Delete(':imageId')
  async deleteImage(@Param('imageId', ParseIntPipe) imageId: number) {
    const res = await this.imagesService.delete(imageId);
    return {
      message: 'Image deleted successfully',
      data: res,
    };
  }
}
