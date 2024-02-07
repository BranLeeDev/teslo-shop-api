import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from '../base.entity';
import { ImagesTypes } from '../../types/enums.type';
import { Exclude } from 'class-transformer';
import { Product } from '@entity/products/product.entity';

@Entity({ name: 'images' })
export class Image extends Base {
  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'int', name: 'width_px' })
  width: number;

  @Column({ type: 'int', name: 'height_px' })
  height: number;

  @Column({ type: 'varchar', length: 125 })
  alt: string;

  @Exclude()
  @Column({ type: 'enum', enum: ImagesTypes })
  type: string;

  @Exclude()
  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'size_kb' })
  sizeKb: number;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
