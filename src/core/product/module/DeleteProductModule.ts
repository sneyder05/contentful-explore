import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entity/Product';
import { DeleteProductController } from '../controller/DeleteProductController';
import { GetProductService } from '../service/GetProductService';
import { DeleteProductService } from '../service/DeleteProductService';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [DeleteProductController],
  providers: [GetProductService, DeleteProductService],
})
export class DeleteProductModule {}
