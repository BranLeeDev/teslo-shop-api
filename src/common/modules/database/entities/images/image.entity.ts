import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ImagesTypes } from '../../types/enums.type';
import { Base } from '../base.entity';
import { Product } from '@entity/products/product.entity';

@Entity({ name: 'images' })
export class Image extends Base {
  @ApiProperty({ description: 'URL of the image' })
  @Column({ type: 'text' })
  url: string;

  @ApiProperty({ description: 'Width of the image in pixels' })
  @Column({ type: 'int', name: 'width_px' })
  width: number;

  @ApiProperty({ description: 'Height of the image in pixels' })
  @Column({ type: 'int', name: 'height_px' })
  height: number;

  @ApiProperty({ description: 'Alternate text for the image' })
  @Column({ type: 'varchar', length: 125 })
  alt: string;

  @Exclude()
  @Column({ type: 'enum', enum: ImagesTypes })
  type: string;

  @Exclude()
  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'size_kb' })
  sizeKb: number;

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
