import { Injectable } from '@nestjs/common';
import { PercentageDeletedProductsReportRequestDto } from '../model/PercentageDeletedProductsReportResponseDto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class PercentageDeletedProductsReportService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async generate(): Promise<PercentageDeletedProductsReportRequestDto> {
    const result = await this.dataSource.createQueryRunner().query(
      `
      SELECT
          (COUNT(deleted_at) * 100.0 / COUNT(*))::INT AS percentage
      FROM product;
      `,
      [],
      true,
    );

    return {
      percentage: Number(result.raw[0].percentage),
    };
  }
}
