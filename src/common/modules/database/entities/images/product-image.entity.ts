import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@entity/products/product.entity';
import { Image } from '@entity/shared/image.entity';

@Entity({ name: 'product_images' })
export class ProductImage extends Image {
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
