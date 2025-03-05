import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PercentageDeletedProductsReportService } from '../service/PercentageDeletedProductsReportService';
import { PercentageDeletedProductsReportRequestDto } from '../model/PercentageDeletedProductsReportResponseDto';

@Controller('/reports')
@ApiTags('Reports')
export class PercentageDeletedProductsReportController {
  constructor(private readonly reportService: PercentageDeletedProductsReportService) {}

  @Get('/percentage-deleted-products')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get percentage of deleted products' })
  @ApiOkResponse({
    description: 'Percentage of deleted products report',
    type: PercentageDeletedProductsReportRequestDto,
  })
  async getPercentageDeletedProducts(): Promise<PercentageDeletedProductsReportRequestDto> {
    return this.reportService.generate();
  }
}
