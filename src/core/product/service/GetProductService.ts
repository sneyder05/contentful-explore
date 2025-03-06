import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/Product';

@Injectable()
export class GetProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  async getById(id: string): Promise<Product> {
    return this.productRepository.findOneOrFail({ where: { sku: id } });
  }
}
