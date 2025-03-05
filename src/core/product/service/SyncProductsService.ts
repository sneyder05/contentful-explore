import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentfulClientApi, EntryCollection } from 'contentful';
import { ConfigKey } from 'src/config/ConfigKey';
import { ContentfulProduct, ContentfulProductSkeleton } from 'src/core/contentful/types/ContentProductSkeleton';
import { CONTENTFUL_CLIENT } from 'src/core/contentful/util/ContenfulConstants';
import { IsNull, Not, Repository } from 'typeorm';
import { Product } from '../entity/Product';

const CONTENTFUL_BATCH_SIZE = 50;

@Injectable()
export class SyncProductsService {
  private readonly logger = new Logger(SyncProductsService.name);

  constructor(
    @Inject(CONTENTFUL_CLIENT) private readonly contentfulClient: ContentfulClientApi<any>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async syncProducts() {
    this.logger.log('Syncing products...');

    await this.saveProducts(await this.fetchProducts());
  }

  private async fetchProducts(): Promise<ContentfulProduct[]> {
    const contentType = this.configService.get<string>(ConfigKey.CONTENTFUL_CONTENT_TYPE, 'product');
    let response: EntryCollection<ContentfulProductSkeleton>;
    const items: ContentfulProduct[] = [];
    const deletedProducts = await this.getDeletedProducts();

    this.logger.debug(`Skipping ${deletedProducts.length} deleted products`);

    do {
      response = await this.contentfulClient.getEntries<ContentfulProductSkeleton>({
        content_type: contentType,
        limit: CONTENTFUL_BATCH_SIZE,
        skip: items.length,
        'fields.sku[nin]': deletedProducts,
      });

      items.push(...response.items);
    } while (response.total > items.length);

    this.logger.debug(`Fetched ${items.length} products`);

    return items;
  }

  private async getDeletedProducts(): Promise<string[]> {
    const products = await this.productRepository.find({ withDeleted: true, where: { deletedAt: Not(IsNull()) } });

    return products.map((product) => product.sku);
  }

  private async saveProducts(products: ContentfulProduct[]): Promise<void> {
    const entities = products.map((product) => {
      return this.productRepository.create({
        sku: product.fields.sku as string,
        name: product.fields.name as string,
        brand: product.fields.brand as string,
        model: product.fields.model as string,
        category: product.fields.category as string,
        price: product.fields.price as number,
        currency: product.fields.currency as string,
        stock: product.fields.stock as number,
      });
    });

    await this.productRepository.save(entities);

    this.logger.debug('Products saved');
  }
}
