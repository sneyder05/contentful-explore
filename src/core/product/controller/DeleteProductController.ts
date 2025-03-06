import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiNoContentResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteProductService } from '../service/DeleteProductService';
import { Public } from '../../../decorator/PublicEndpointDecorator';

@Controller('/products')
@ApiTags('Products')
export class DeleteProductController {
  constructor(private readonly deleteProductService: DeleteProductService) {}

  @Delete('/:id')
  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete product', operationId: 'deleteProduct' })
  @ApiNoContentResponse({ description: 'Product deleted' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.deleteProductService.deleteProduct(id);
  }
}
