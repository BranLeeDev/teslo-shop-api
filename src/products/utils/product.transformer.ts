import { Product } from '@entity/products/product.entity';
import { transformImageFindByProduct } from '@images/utils/image.transformer';
import { ProductCache } from '@products/interfaces/product-cache.interface';

export function transformProductFindOne(product: Product): ProductCache {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    stock: product.stock,
    images: transformImageFindByProduct(product.images),
  };
}

export function transformProductFindAll(
  productsList: Product[],
): ProductCache[] {
  return productsList.map((product) => {
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      stock: product.stock,
    };
  });
}
