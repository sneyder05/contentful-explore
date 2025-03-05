import { ApiProperty } from '@nestjs/swagger';

export class PercentageDeletedProductsReportRequestDto {
  @ApiProperty({ type: Number, example: '10' })
  percentage!: number;
}
