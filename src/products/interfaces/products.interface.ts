import { Product } from '@entity/products/product.entity';
import { CreateProductDto, FilterProductDto, UpdateProductDto } from '../dtos';

export interface IProductsService {
  findAll(filterProductDto?: FilterProductDto): Promise<Product[]>;
  findOne(term: string, hasRelations?: boolean): Promise<Product>;
  create(createProductDto: CreateProductDto): Promise<Product>;
  update(term: string, updateProductDto: UpdateProductDto): Promise<Product>;
  delete(term: string): Promise<Product>;
}
