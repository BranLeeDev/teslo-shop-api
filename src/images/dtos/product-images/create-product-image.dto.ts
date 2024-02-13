import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ImagesTypes, ProductImagesTypes } from '@database/types/enums.type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductImageDto {
  @ApiProperty({
    description: 'URL of the image',
    minLength: 11,
    format: 'binary',
    example:
      'https://res.cloudinary.com/dbbixakcl/image/upload/f_auto,q_auto/v1/teslo-shop-api/images/products/opwcokhlkeba24dqgdbh',
  })
  @IsNotEmpty({ message: 'URL is required' })
  @IsString({ message: 'URL must be a string' })
  @IsUrl({}, { message: 'URL must be a valid URL' })
  @MinLength(11, { message: 'URL is too short' })
  @Transform(({ value }: { value: string }) => value.trim())
  readonly url: string;

  @ApiProperty({ description: 'Width of the image in pixels', example: 640 })
  @IsNotEmpty({ message: 'Width is required' })
  @IsNumber({}, { message: 'Width must be a number' })
  @IsInt({ message: 'Width must be an integer' })
  @IsPositive({ message: 'Width must be positive' })
  readonly width: number;

  @ApiProperty({ description: 'Height of the image in pixels', example: 427 })
  @IsNotEmpty({ message: 'Height is required' })
  @IsNumber({}, { message: 'Height must be a number' })
  @IsInt({ message: 'Height must be an integer' })
  @IsPositive({ message: 'Height must be positive' })
  readonly height: number;

  @ApiProperty({
    description: 'Alt text of the image',
    minLength: 3,
    maxLength: 125,
    nullable: true,
    example:
      'Hand holding a hanger with an orange t-shirt against a white background',
  })
  @IsNotEmpty({ message: 'Alt is required' })
  @IsString({ message: 'Alt must be a string' })
  @MinLength(3, { message: 'Alt is too short' })
  @MaxLength(125, { message: 'Alt is too long' })
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.trim())
  readonly alt?: string;

  @ApiProperty({
    description: 'Type of the image',
    enum: ProductImagesTypes,
    example: ProductImagesTypes.JPG,
  })
  @IsNotEmpty({ message: 'Type is required' })
  @IsEnum(ProductImagesTypes, { message: 'Type must be a valid image type' })
  readonly type: ImagesTypes;

  @ApiProperty({
    description: 'Size of the image in kilobytes (KB)',
    example: 24,
  })
  @IsNotEmpty({ message: 'Size is required' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Size must have up to two decimal places' },
  )
  @IsPositive({ message: 'Size must be positive' })
  readonly size: number;

  @ApiProperty({
    description: 'Public ID of the image in Cloudinary',
    nullable: true,
    example: 'teslo-shop-api/images/products/opwcokhlkeba24dqgdbh',
  })
  @IsString({ message: 'PublicId must be a string' })
  @IsOptional()
  readonly publicId?: string;

  @ApiProperty({
    description: 'ID of the product associated with the image',
  })
  @IsNotEmpty({ message: 'ProductId is required' })
  @IsNumber({}, { message: 'ProductId must be a number' })
  @IsInt({ message: 'ProductId must be an integer' })
  @IsPositive({ message: 'ProductId must be positive' })
  readonly productId: number;
}
