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
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name is too short' })
  @MaxLength(30, { message: 'Name is too long' })
  @Transform(({ value }: { value: string }) => value.trim())
  readonly name: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  @MinLength(15, { message: 'Description is too short' })
  @MaxLength(255, { message: 'Description is too long' })
  @Transform(({ value }: { value: string }) => value.trim())
  readonly description: string;

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

  @IsNotEmpty({ message: 'Stock is required' })
  @IsNumber({}, { message: 'Stock must be a number' })
  @IsInt({ message: 'Stock must be an integer' })
  @IsPositive({ message: 'Stock must be positive' })
  readonly stock: number;
}
