import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    minLength: 3,
    maxLength: 30,
    example: 'Cotton T-Shirt',
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name is too short' })
  @MaxLength(30, { message: 'Name is too long' })
  @Transform(({ value }: { value: string }) => value.trim())
  readonly name: string;

  @ApiProperty({
    description: 'The description of the product',
    minLength: 15,
    maxLength: 255,
    example: 'Soft and comfortable cotton t-shirt, perfect for everyday wear',
  })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  @MinLength(15, { message: 'Description is too short' })
  @MaxLength(255, { message: 'Description is too long' })
  @Transform(({ value }: { value: string }) => value.trim())
  readonly description: string;

  @ApiProperty({
    description: 'The price of the product',
    minimum: 0,
    maximum: 1000000,
    example: 19.99,
  })
  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    {
      message: 'Price must have at most 2 decimal places and must be a number',
    },
  )
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  @Max(1000000, { message: 'Price must be less than or equal to 1000000' })
  readonly price: number;

  @ApiProperty({
    description: 'The stock of the product',
    minimum: 0,
    example: 150,
  })
  @IsNotEmpty({ message: 'Stock is required' })
  @IsNumber({}, { message: 'Stock must be a number' })
  @IsInt({ message: 'Stock must be an integer' })
  @IsPositive({ message: 'Stock must be positive' })
  @Max(10000)
  readonly stock: number;
}
