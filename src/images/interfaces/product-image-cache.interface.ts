import { ProductCache } from '@products/interfaces/product-cache.interface';

export interface ProductImageCache {
  id: number;
  alt: string;
  product?: ProductCache;
}
