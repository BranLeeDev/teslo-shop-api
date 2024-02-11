import { ImageCache } from '@images/interfaces/image-cache.interface';

export interface ProductCache {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images?: ImageCache[];
}
