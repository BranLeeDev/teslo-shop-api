import { CreateProductImageDto } from 'src/images/dtos';
import { ImagesTypes } from '../../database/types/enums.type';

export const productImagesList: CreateProductImageDto[] = [
  {
    url: 'https://res.cloudinary.com/dbbixakcl/image/upload/f_auto,q_auto/v1/teslo-shop-api/images/bh0rwzdi64njgfumgvp8',
    width: 640,
    height: 427,
    alt: 'Jar with coconut oil and spoon on rustic surface',
    type: ImagesTypes.JPG,
    size: 69.25,
    productId: 1,
  },
  {
    url: 'https://res.cloudinary.com/dbbixakcl/image/upload/f_auto,q_auto/v1/teslo-shop-api/images/n1tadk5ozuovnifwvbx5',
    width: 640,
    height: 427,
    alt: 'Cartoon of a cracked open coconut',
    type: ImagesTypes.JPG,
    size: 86.36,
    productId: 1,
  },
  {
    url: 'https://res.cloudinary.com/dbbixakcl/image/upload/f_auto,q_auto/v1/teslo-shop-api/images/bzuvjtyrezigf7rhd2bg',
    width: 640,
    height: 427,
    alt: 'Open jar of coconut oil',
    type: ImagesTypes.JPG,
    size: 56.56,
    productId: 1,
  },
  {
    url: 'https://res.cloudinary.com/dbbixakcl/image/upload/f_auto,q_auto/v1/teslo-shop-api/images/d2oup9odqgakd4akwden',
    width: 640,
    height: 427,
    alt: 'Person holding a smartphone with a list',
    type: ImagesTypes.JPG,
    size: 40.57,
    productId: 2,
  },
  {
    url: 'https://res.cloudinary.com/dbbixakcl/image/upload/f_auto,q_auto/v1/teslo-shop-api/images/vk23z7radgcgpnuo6fep',
    width: 640,
    height: 427,
    alt: 'Gold smartphone on a dark surface',
    type: ImagesTypes.JPG,
    size: 43.33,
    productId: 2,
  },
  {
    url: 'https://res.cloudinary.com/dbbixakcl/image/upload/f_auto,q_auto/v1/teslo-shop-api/images/yumbzcsylrz3inlj8r46',
    width: 640,
    height: 427,
    alt: 'Person with phone displaying a flower, next to an apple',
    type: ImagesTypes.JPG,
    size: 44.49,
    productId: 2,
  },
];
