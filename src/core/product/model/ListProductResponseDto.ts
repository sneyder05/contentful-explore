import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray } from 'class-validator';
import { ProductDto } from './ProductDto';

@Expose()
export class ListProductResponseDto {
  @Expose()
  @ApiProperty({ type: [ProductDto] })
  @IsArray()
  items!: ProductDto[];
}
