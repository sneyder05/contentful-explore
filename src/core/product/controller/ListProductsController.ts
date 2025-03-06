import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListProductsRequestDto } from '../model/ListProductsRequestDto';
import { ListProductResponseDto } from '../model/ListProductResponseDto';
import { ListProductsService } from '../service/ListProductsService';
import { Public } from '../../../auth/decorator/PublicEndpointDecorator';

@Controller('/products')
@ApiTags('Products')
export class ListProductsController {
  constructor(private readonly listProductsService: ListProductsService) {}

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List products', operationId: 'listProducts' })
  @ApiOkResponse({ type: ListProductResponseDto, description: 'List of products' })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  async listProducts(@Query() options: ListProductsRequestDto): Promise<ListProductResponseDto> {
    const items = await this.listProductsService.list(options);

    return { items };
  }
}
