import { Module } from '@nestjs/common';
import { ListProductsModule } from './ListProductsModule';
import { DeleteProductModule } from './DeleteProductModule';
import { SyncProductsModule } from './SyncProductsModule';

@Module({
  imports: [ListProductsModule, DeleteProductModule, SyncProductsModule],
})
export class ProductModule {}
