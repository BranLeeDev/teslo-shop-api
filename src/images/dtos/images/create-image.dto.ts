import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ImagesTypes } from 'src/common/modules/database/types/enums.type';

export class CreateImageDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @MinLength(11)
  readonly url: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  readonly width: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  readonly height: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(125)
  readonly alt: string;

  @IsNotEmpty()
  @IsEnum(ImagesTypes)
  readonly type: ImagesTypes;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  readonly sizeKb: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  readonly productId: number;
}
