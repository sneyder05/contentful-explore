import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entity/Product';
import { DeleteProductController } from '../controller/DeleteProductController';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [DeleteProductController],
  providers: [],
})
export class DeleteProductModule {}
