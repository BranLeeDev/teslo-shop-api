import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DeviceImagesTypes } from '@database/types/enums.type';
import { Base } from '@entity/shared/base.entity';
import { ProductImage } from './product-image.entity';

@Entity({ name: 'device_images' })
export class DeviceImage extends Base {
  @ApiProperty({
    description: 'URL of the image',
  })
  @Column({ name: 'image_url', type: 'text' })
  imageUrl: string;

  @ApiProperty({
    description: 'Width of the image in pixels',
  })
  @Column({ name: 'width_px', type: 'int' })
  width: number;

  @ApiProperty({
    description: 'Height of the image in pixels',
  })
  @Column({ name: 'height_px', type: 'int' })
  height: number;

  @ApiProperty({
    description: 'Type of device for which the image is intended',
    enum: DeviceImagesTypes,
  })
  @Column({ name: 'device_type', type: 'enum', enum: DeviceImagesTypes })
  deviceType: DeviceImagesTypes;

  @ApiProperty({
    description: 'Size of the image in kilobytes',
  })
  @Column({ name: 'size_kb', type: 'decimal' })
  sizeKb: number;

  @ApiProperty({
    description: 'Public ID of the image in Cloudinary',
    type: 'string',
  })
  @Column({ name: 'public_id', type: 'text' })
  publicId: string;

  @ApiProperty({
    description: 'Product image associated with this device image',
  })
  @ManyToOne(() => ProductImage)
  @JoinColumn({ name: 'product_image_id' })
  productImage: Relation<ProductImage>;
}
