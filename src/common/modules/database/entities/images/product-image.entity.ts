import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@entity/products/product.entity';
import { Base } from '@entity/shared/base.entity';
import { ProductImagesTypes } from '@database/types/enums.type';
import { DeviceImage } from './device-image.entity';

@Entity({ name: 'product_images' })
export class ProductImage extends Base {
  @ApiProperty({
    description: 'Alternative text of the image',
    type: 'string',
    maxLength: 125,
  })
  @Column({ name: 'alt_text', type: 'varchar', length: 125 })
  alt: string;

  @ApiProperty({
    description: 'Type of image of the product',
    enum: ProductImagesTypes,
  })
  @Column({ name: 'image_type', type: 'enum', enum: ProductImagesTypes })
  imageType: ProductImagesTypes;

  @OneToMany(() => DeviceImage, (deviceImage) => deviceImage.productImage)
  deviceImages: Relation<DeviceImage[]>;

  @ApiProperty({
    type: () => Product,
    description: 'Product associated with the image',
  })
  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
