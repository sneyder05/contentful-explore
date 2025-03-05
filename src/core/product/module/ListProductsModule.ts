import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entity/Product';
import { ListProductsController } from '../controller/ListProductsController';
import { ListProductsService } from '../service/ListProductsService';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ListProductsController],
  providers: [ListProductsService],
})
export class ListProductsModule {}
