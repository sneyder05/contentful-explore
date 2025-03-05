import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/Product';
import { GetProductService } from './GetProductService';

@Injectable()
export class DeleteProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly getProductService: GetProductService,
  ) {}

  async deleteProduct(id: string): Promise<void> {
    const product = await this.validateProductExists(id);

    this.validateProductIsNotDeleted(product);

    await this.productRepository.softDelete(product.sku);
  }

  private async validateProductExists(id: string): Promise<Product> {
    try {
      return this.getProductService.getById(id);
    } catch {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }

  private validateProductIsNotDeleted(product: Product): void {
    if (product.deletedAt) {
      throw new NotFoundException(`Product with id ${product.sku} not found`);
    }
  }
}
