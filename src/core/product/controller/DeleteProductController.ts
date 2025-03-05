import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteProductService } from '../service/DeleteProductService';

@Controller('/products')
@ApiTags('Products')
export class DeleteProductController {
  constructor(private readonly deleteProductService: DeleteProductService) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete product', operationId: 'deleteProduct' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.deleteProductService.deleteProduct(id);
  }
}
