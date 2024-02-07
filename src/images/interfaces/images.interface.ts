import { CreateImageDto, UpdateImageDto } from '../dtos';
import { Image } from '@entity/images/image.entity';

export interface IImagesService {
  findAll(): Promise<Image[]>;
  create(createImageDto: CreateImageDto): Promise<Image>;
  update(imageId: number, updateImageDto: UpdateImageDto): Promise<Image>;
  delete(imageId: number): Promise<void>;
  deleteAllImages(): Promise<void>;
}
