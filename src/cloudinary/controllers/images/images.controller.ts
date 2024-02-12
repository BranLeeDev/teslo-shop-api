import {
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileInterceptor,
  UploadedFile,
  MemoryStorageFile,
} from '@blazity/nest-file-fastify';
import { ImagesService } from '../../services/images/images.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FileUploadDto } from '../../dtos/file-upload.dto';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @ApiOperation({
    summary: 'Upload an image',
    description:
      'Uploads the image to Cloudinary. The image will later be associated with a record in the database. After uploading, the returned data will include the image URL and its properties. You will need to pass this data to another endpoint to save it to the database',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file',
    type: FileUploadDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiUnprocessableEntityResponse({
    description: 'The file is invalid or its name is incorrect',
  })
  @ApiBadRequestResponse({
    description: 'Invalid or incorrect field provided for the file',
  })
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg)$/,
        })
        .addMaxSizeValidator({
          maxSize: 204800,
          message: 'Image size must not exceed 200 KB',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    image: MemoryStorageFile,
  ) {
    try {
      const res = await this.imagesService.uploadImage(image);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
