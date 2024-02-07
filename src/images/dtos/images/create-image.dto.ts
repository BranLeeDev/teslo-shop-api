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
  @IsNumber()
  @IsInt()
  @IsPositive()
  readonly sizeKb: number;
}
