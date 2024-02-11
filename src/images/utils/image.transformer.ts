import { Image } from '@entity/images/image.entity';
import { ImageCache } from '@images/interfaces/image-cache.interface';

export function transformImageFindAll(imagesList: Image[]): ImageCache[] {
  return imagesList.map((image) => {
    return {
      id: image.id,
      url: image.url,
      width: image.width,
      height: image.height,
      alt: image.alt,
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

export function transformImageFindByProduct(imagesList: Image[]): ImageCache[] {
  return imagesList.map((image) => {
    return {
      id: image.id,
      url: image.url,
      width: image.width,
      height: image.height,
      alt: image.alt,
    };
  });
}
