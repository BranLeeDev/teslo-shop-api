import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { UploadController } from './controllers/upload/upload.controller';
import { ImagesService } from './services/images/images.service';
import register from '@env/register.environment';

@Module({
  providers: [
    {
      provide: 'CLOUDINARY',
      inject: [register.KEY],
      useFactory: (registerService: ConfigType<typeof register>) => {
        const { cloudName, apiKey, apiSecret } = registerService.cloudinary;

        return cloudinary.config({
          cloud_name: cloudName,
          api_key: apiKey,
          api_secret: apiSecret,
        });
      },
    },
    ImagesService,
  ],
  controllers: [UploadController],
  exports: [ImagesService],
})
export class CloudinaryModule {}
