import { MemoryStorageFile } from '@blazity/nest-file-fastify';
import { ImagesTypes } from '@database/types/enums.type';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CreateImageDto } from 'src/cloudinary/dtos/create-image.dto';
import * as streamifier from 'streamifier';

@Injectable()
export class ImagesService {
  uploadImage(image: MemoryStorageFile) {
    try {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'teslo-shop-api/images/products' },
          (error, result) => {
            if (error) return reject(error);
            if (!result) return reject(new Error('No result from Cloudinary'));

            const createImageDto: CreateImageDto = {
              url: this.getOptimizedImageUrl(result.public_id),
              width: result.width,
              height: result.height,
              type: ImagesTypes[result.format.toUpperCase() as ImagesTypes],
              size: this.bytesToKilobytes(result.bytes),
              publicId: result.public_id,
            };

            resolve(createImageDto);
          },
        );

        streamifier.createReadStream(image.buffer).pipe(uploadStream);
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private getOptimizedImageUrl(publicId: string): string {
    const baseUrl = `https://res.cloudinary.com/dbbixakcl/image/upload`;
    const optimizationParameters = 'f_auto,q_auto';
    const imageUrl = `${baseUrl}/${optimizationParameters}/v1/${publicId}`;
    return imageUrl;
  }

  private bytesToKilobytes(bytes: number): number {
    const kilobytes = bytes / 1024;
    return +kilobytes.toFixed(2);
  }

  async checkPublicIdInCloudinary(publicId: string) {
    try {
      await cloudinary.api.resource(publicId).catch((error) => {
        throw new NotFoundException(error.error);
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
