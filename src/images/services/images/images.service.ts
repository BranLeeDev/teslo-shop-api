import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '@entity/images/image.entity';
import { CreateImageDto } from '../../dtos';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/services/products/products.service';
import { UpdateImageDto } from 'src/images/dtos/images/update-image.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepo: Repository<Image>,
    private readonly productsService: ProductsService,
  ) {}

  async findAll() {
    const imagesList = await this.imageRepo.find();
    return imagesList;
  }

  async create(createImageDto: CreateImageDto) {
    const newImage = this.imageRepo.create(createImageDto);
    if (createImageDto.productId) {
      const product = await this.productsService.findOne(
        String(createImageDto.productId),
      );
      newImage.product = product;
    }
    const createdImage = await this.imageRepo.save(newImage);
    return createdImage;
  }

  async update(imageId: number, updateImageDto: UpdateImageDto) {
    const imageFound = await this.imageRepo.findOneBy({ id: imageId });
    if (!imageFound)
      throw new NotFoundException(`Image with id ${imageId} not found`);
    if (updateImageDto.productId) {
      const product = await this.productsService.findOne(
        String(updateImageDto.productId),
      );
      imageFound.product = product;
    }
    this.imageRepo.merge(imageFound, updateImageDto);
    const updatedImage = await this.imageRepo.save(imageFound);
    return updatedImage;
  }

  async delete(imageId: number) {
    const imageFound = await this.imageRepo.findOneBy({ id: imageId });
    if (!imageFound)
      throw new NotFoundException(`Image with id ${imageId} not found`);
    await this.imageRepo.delete(imageId);
    return imageFound;
  }

  async deleteAllImages() {
    await this.imageRepo.delete({});
  }
}
