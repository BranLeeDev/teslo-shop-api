import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';

export class FilterImageDto {
  @IsNumber({}, { message: 'Limit must be a number' })
  @IsInt({ message: 'Limit must be an integer' })
  @IsPositive({ message: 'Limit must be positive' })
  @Max(100, { message: 'Limit must not exceed 100' })
  @IsOptional()
  readonly limit?: number;

  @IsNumber({}, { message: 'Offset must be a number' })
  @IsInt({ message: 'Offset must be an integer' })
  @Min(0, { message: 'Offset must be greater than or equal to 0' })
  @IsOptional()
  readonly offset?: number;
}
