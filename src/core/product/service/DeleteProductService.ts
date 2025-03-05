import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, QueryRunner } from 'typeorm';
import { Product } from '../entity/Product';
import { GetProductService } from './GetProductService';
import { DeletedProduct } from '../entity/DeletedProduct';

@Injectable()
export class DeleteProductService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly getProductService: GetProductService,
  ) {}

  async deleteProduct(id: string): Promise<void> {
    await this.validateProductExists(id);

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      await this.deleteProductById(queryRunner, id);
      await this.saveDeletedProduct(queryRunner, id);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async deleteProductById(queryRunner: QueryRunner, id: string): Promise<void> {
    await queryRunner.manager.delete(Product, id);
  }

  private async validateProductExists(id: string): Promise<void> {
    try {
      await this.getProductService.getById(id);
    } catch {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }

  private async saveDeletedProduct(queryRunner: QueryRunner, id: string): Promise<void> {
    const deletedProduct = queryRunner.manager.create(DeletedProduct, { sku: id });

    await queryRunner.manager.save(deletedProduct);
  }
}
