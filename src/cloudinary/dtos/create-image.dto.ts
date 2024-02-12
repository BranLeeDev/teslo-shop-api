import { OmitType } from '@nestjs/swagger';
import { CreateProductImageDto } from '@images/dtos';

export class CreateImageDto extends OmitType(CreateProductImageDto, [
  'productId',
  'alt',
]) {}
