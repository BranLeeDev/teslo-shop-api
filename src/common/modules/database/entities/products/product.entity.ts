import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../base.entity';
import { Image } from '@entity/images/image.entity';

@Entity({ name: 'products' })
export class Product extends Base {
  @ApiProperty({ description: 'The name of the product', maxLength: 60 })
  @Column({ type: 'varchar', length: 60, unique: true })
  name: string;

  @ApiProperty({ description: 'The slug of the product', maxLength: 60 })
  @Column({ type: 'varchar', length: 60, unique: true })
  slug: string;

  @ApiProperty({
    description: 'The description of the product',
    maxLength: 255,
  })
  @Column({ type: 'varchar', length: 255 })
  description: string;

  @ApiProperty({ description: 'The price of the product' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    description: 'The stock of the product',
  })
  @Column({ type: 'int' })
  stock: number;

  @OneToMany(() => Image, (image) => image.product)
  images: Image[];

  @BeforeInsert()
  @BeforeUpdate()
  checkSlugInsert() {
    this.slug = this.generateSlug(this.name);
  }

  private generateSlug(text: string): string {
    return text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .substring(0, 60)
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
}
