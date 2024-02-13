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
import { ImagesTypes } from '@database/types/enums.type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductImageDto {
  @ApiProperty({
    description: 'URL of the image',
    minLength: 11,
    format: 'binary',
  })
  @IsNotEmpty({ message: 'URL is required' })
  @IsString({ message: 'URL must be a string' })
  @IsUrl({}, { message: 'URL must be a valid URL' })
  @MinLength(11, { message: 'URL is too short' })
  @Transform(({ value }: { value: string }) => value.trim())
  readonly url: string;

  @ApiProperty({ description: 'Width of the image in pixels' })
  @IsNotEmpty({ message: 'Width is required' })
  @IsNumber({}, { message: 'Width must be a number' })
  @IsInt({ message: 'Width must be an integer' })
  @IsPositive({ message: 'Width must be positive' })
  readonly width: number;

  @ApiProperty({ description: 'Height of the image in pixels' })
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
    enum: ImagesTypes,
  })
  @IsNotEmpty({ message: 'Type is required' })
  @IsEnum(ImagesTypes, { message: 'Type must be a valid image type' })
  readonly type: ImagesTypes;

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
