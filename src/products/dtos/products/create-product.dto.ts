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
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Transform(({ value }: { value: string }) => value.trim())
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(15)
  @MaxLength(255)
  @Transform(({ value }: { value: string }) => value.trim())
  readonly description: string;

  @IsNotEmpty()
  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    {
      message:
        'Property must have at most 2 decimal places and must be a number',
    },
  )
  @Min(0)
  @Max(1000000)
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  readonly stock: number;
}
