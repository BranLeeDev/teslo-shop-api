import { Body, Controller, Post } from '@nestjs/common';
import { CreateImageDto } from 'src/images/dtos';
import { ImagesService } from 'src/images/services/images/images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  async createImage(@Body() createImageDto: CreateImageDto) {
    const res = await this.imagesService.create(createImageDto);
    return {
      message: 'Image created successfully',
      data: res,
    };
  }
}
