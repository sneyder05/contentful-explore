import { Injectable } from '@nestjs/common';
import { ProductDto } from '../model/ProductDto';
import { ListProductsRequestDto } from '../model/ListProductsRequestDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entity/Product';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { toProductDto } from '../util/toProductDto';

const MAX_PAGE_SIZE = 5;

@Injectable()
export class ListProductsService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  public async list(options: ListProductsRequestDto): Promise<ProductDto[]> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    this.applyFilters(queryBuilder, options);
    this.applyPaging(queryBuilder, options);

    const products = await queryBuilder.getMany();

    return products.map(toProductDto);
  }

  private applyPaging(queryBuilder: SelectQueryBuilder<Product>, options: ListProductsRequestDto) {
    const pageNumber = options.pageNumber ?? 1;
    const pageSize = options.pageSize ?? MAX_PAGE_SIZE;
    const skip = (pageNumber - 1) * pageSize;

    queryBuilder.skip(skip).take(pageSize);
  }

  private applyFilters(queryBuilder: SelectQueryBuilder<Product>, options: ListProductsRequestDto) {
    if (options.name) {
      queryBuilder.where('product.name ILIKE :name', { name: `%${options.name.trim()}%` });
    }

    if (options.category) {
      queryBuilder.andWhere('product.category = :category', { category: options.category });
    }

    if (options.minPrice) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice: options.minPrice });
    }

    if (options.maxPrice) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice: options.maxPrice });
    }
  }
}
