import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max } from 'class-validator';

export class ListProductsRequestDto {
  @ApiPropertyOptional({ type: Number, example: 5 })
  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  @Max(5)
  @IsNumber()
  @Type(() => Number)
  pageSize?: number;

  @ApiPropertyOptional({ type: Number, example: 1 })
  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  pageNumber?: number;

  @ApiPropertyOptional({ type: String, example: 'Apple' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ type: String, example: 'Smartphone' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ type: Number, example: 10, description: 'Min price' })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  minPrice?: number;

  @ApiPropertyOptional({ type: Number, example: 10, description: 'Max price' })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  maxPrice?: number;
}
