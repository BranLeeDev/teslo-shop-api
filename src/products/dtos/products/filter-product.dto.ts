import { IsInt, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class FilterProductDto {
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  readonly limit?: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly offset?: number;
}
