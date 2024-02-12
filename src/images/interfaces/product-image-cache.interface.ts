import { ProductCache } from '@products/interfaces/product-cache.interface';

export interface ProductImageCache {
  id: number;
  url: string;
  width: number;
  height: number;
  alt: string;
  product?: ProductCache;
}
