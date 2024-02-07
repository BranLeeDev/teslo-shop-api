import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateImageDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @MinLength(11)
  url: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  width: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  height: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(125)
  alt: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  sizeKb: number;
}
