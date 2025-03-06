import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ type: String, example: 'ABC123' })
  sku!: string;

  @ApiProperty({ type: String, example: 'Apple Mi Watch' })
  name!: string;

  @ApiProperty({ type: String, example: 'X01' })
  model!: string;

  @ApiProperty({ type: String, example: 'Apple' })
  brand!: string;

  @ApiProperty({ type: Number, example: '10' })
  price!: number;

  @ApiProperty({ type: String, example: 'USD' })
  currency!: string;

  @ApiProperty({ type: Number, example: '100' })
  stock!: number;

  @ApiProperty({ type: String, example: 'Smartphone' })
  category!: string;
}
