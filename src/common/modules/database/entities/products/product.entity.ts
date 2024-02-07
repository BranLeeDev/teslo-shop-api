import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { Base } from '../base.entity';

@Entity({ name: 'products' })
export class Product extends Base {
  @Column({ type: 'varchar', length: 60, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 60, unique: true })
  slug: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  stock: number;

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
