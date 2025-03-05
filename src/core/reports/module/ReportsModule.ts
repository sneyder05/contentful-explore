import { Module } from '@nestjs/common';
import { PercentageDeletedProductsReportModule } from './PercentageDeletedProductsReportModule';

@Module({
  imports: [PercentageDeletedProductsReportModule],
})
export class ReportsModule {}
