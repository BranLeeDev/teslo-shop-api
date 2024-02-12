import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { ImagesController } from './controllers/images/images.controller';
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
  controllers: [ImagesController],
  exports: [ImagesService],
})
export class CloudinaryModule {}
