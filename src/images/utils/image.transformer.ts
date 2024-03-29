import { ProductImage } from '@entity/images/product-image.entity';
import { ProductImageCache } from '@images/interfaces/product-image-cache.interface';

export function transformImageFindAll(
  imagesList: ProductImage[],
): ProductImageCache[] {
  return imagesList.map((image) => {
    return {
      id: image.id,
      alt: image.alt as string,
      product: {
        id: image.product.id,
        name: image.product.name,
        slug: image.product.slug,
        description: image.product.description,
        price: image.product.price,
        stock: image.product.stock,
      },
    };
  });
}

export function transformImageFindByProduct(
  imagesList: ProductImage[],
): ProductImageCache[] {
  return imagesList.map((image) => {
    return {
      id: image.id,
      alt: image.alt as string,
    };
  });
}
