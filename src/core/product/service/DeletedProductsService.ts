import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeletedProduct } from '../entity/DeletedProduct';

@Injectable()
export class DeletedProductsService {
  constructor(
    @InjectRepository(DeletedProduct) private readonly deletedProductRepository: Repository<DeletedProduct>,
  ) {}

  async getAll(): Promise<DeletedProduct[]> {
    return this.deletedProductRepository.find();
  }
}
