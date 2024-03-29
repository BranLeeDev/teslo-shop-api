import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';

export class FilterProductDto {
  @ApiProperty({
    required: false,
    description: 'Limit of products to retrieve (maximum 100)',
    default: 10,
    minimum: 1,
    maximum: 100,
    example: 10,
  })
  @IsNumber({}, { message: 'Limit must be a number' })
  @IsInt({ message: 'Limit must be an integer' })
  @IsPositive({ message: 'Limit must be positive' })
  @Max(100, { message: 'Limit must not exceed 100' })
  @IsOptional()
  readonly limit?: number;

  @ApiProperty({
    required: false,
    description: 'Offset for pagination',
    default: 0,
    example: 0,
  })
  @IsNumber({}, { message: 'Offset must be a number' })
  @IsInt({ message: 'Offset must be an integer' })
  @Min(0, { message: 'Offset must be greater than or equal to 0' })
  @IsOptional()
  readonly offset?: number;
}
