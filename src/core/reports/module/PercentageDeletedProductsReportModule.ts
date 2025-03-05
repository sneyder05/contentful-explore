import { Module } from '@nestjs/common';
import { PercentageDeletedProductsReportController } from '../controller/PercentageDeletedProductsReportController';
import { PercentageDeletedProductsReportService } from '../service/PercentageDeletedProductsReportService';

@Module({
  controllers: [PercentageDeletedProductsReportController],
  providers: [PercentageDeletedProductsReportService],
})
export class PercentageDeletedProductsReportModule {}
