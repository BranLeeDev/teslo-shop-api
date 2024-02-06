import { Column, Entity } from 'typeorm';
import { Base } from '../base.entity';

@Entity({ name: 'products' })
export class Product extends Base {
  @Column({ type: 'varchar', length: 60, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 60, unique: true })
  sku: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  stock: number;
}
