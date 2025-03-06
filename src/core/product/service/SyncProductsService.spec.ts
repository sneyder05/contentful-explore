import { TestingModule, Test } from '@nestjs/testing';
import { CONTENTFUL_BATCH_SIZE, SyncProductsService } from './SyncProductsService';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../entity/Product';
import { CONTENTFUL_CLIENT } from '../../../../src/core/contentful/util/ContenfulConstants';
import { ConfigService } from '@nestjs/config';
import { buildContenfulProductMock } from '../../../../test/utils/buildContenfulProductMock';

describe(SyncProductsService.name, () => {
  let syncProductsService: SyncProductsService;

  const productRepositoryMock = {
    find: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };
  const contentfulClientMock = {
    getEntries: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SyncProductsService,
        { provide: getRepositoryToken(Product), useValue: productRepositoryMock },
        { provide: CONTENTFUL_CLIENT, useValue: contentfulClientMock },
        { provide: ConfigService, useValue: new ConfigService({}) },
      ],
    }).compile();

    syncProductsService = module.get<SyncProductsService>(SyncProductsService);
  });

  describe('checks', () => {
    it('should be defined', () => {
      expect(syncProductsService).toBeDefined();
    });
  });

  describe('when success', () => {
    beforeEach(() => {
      productRepositoryMock.create.mockImplementation((product: object) => product);
    });

    describe('sync all products', () => {
      const contentulProductEntries = [buildContenfulProductMock(), buildContenfulProductMock()];

      beforeAll(async () => {
        jest.clearAllMocks();

        contentfulClientMock.getEntries.mockResolvedValueOnce({
          items: contentulProductEntries,
          total: contentulProductEntries.length,
        });

        productRepositoryMock.find.mockResolvedValueOnce([]);

        await syncProductsService.syncProducts();
      });

      it('calls contentful client', () => {
        expect(contentfulClientMock.getEntries).toHaveBeenCalledTimes(1);
        expect(contentfulClientMock.getEntries).toHaveBeenCalledWith({
          content_type: 'product',
          limit: CONTENTFUL_BATCH_SIZE,
          skip: 0,
          'fields.sku[nin]': [],
        });
      });

      it('calls product repository', () => {
        expect(productRepositoryMock.create).toHaveBeenCalledTimes(contentulProductEntries.length);
        expect(productRepositoryMock.save).toHaveBeenCalledTimes(1);
      });
    });

    describe('sync all products in batches', () => {
      const contentulProductEntries = Array.from({ length: 60 }, () => buildContenfulProductMock());

      beforeAll(async () => {
        jest.clearAllMocks();

        contentfulClientMock.getEntries.mockResolvedValueOnce({
          items: contentulProductEntries.slice(0, CONTENTFUL_BATCH_SIZE),
          total: contentulProductEntries.length,
        });
        contentfulClientMock.getEntries.mockResolvedValueOnce({
          items: contentulProductEntries.slice(CONTENTFUL_BATCH_SIZE, 2 * CONTENTFUL_BATCH_SIZE),
          total: contentulProductEntries.length,
        });

        productRepositoryMock.find.mockResolvedValueOnce([]);

        await syncProductsService.syncProducts();
      });

      it('calls contentful client', () => {
        expect(contentfulClientMock.getEntries).toHaveBeenCalledTimes(2);
        expect(contentfulClientMock.getEntries).toHaveBeenNthCalledWith(1, {
          content_type: 'product',
          limit: CONTENTFUL_BATCH_SIZE,
          skip: 0,
          'fields.sku[nin]': [],
        });
        expect(contentfulClientMock.getEntries).toHaveBeenNthCalledWith(2, {
          content_type: 'product',
          limit: CONTENTFUL_BATCH_SIZE,
          skip: CONTENTFUL_BATCH_SIZE,
          'fields.sku[nin]': [],
        });
      });

      it('calls product repository', () => {
        expect(productRepositoryMock.create).toHaveBeenCalledTimes(contentulProductEntries.length);
        expect(productRepositoryMock.save).toHaveBeenCalledTimes(1);
      });
    });

    describe('sync all products excluding deleted', () => {
      const contentulProductEntries = Array.from({ length: 10 }, () => buildContenfulProductMock());
      const deletedProducts = [
        { sku: contentulProductEntries[0].fields.sku },
        { sku: contentulProductEntries[2].fields.sku },
      ] as Product[];
      const deletedProductsIds = deletedProducts.map((product) => product.sku);

      beforeAll(async () => {
        jest.clearAllMocks();

        contentfulClientMock.getEntries.mockResolvedValueOnce({
          items: contentulProductEntries,
          total: contentulProductEntries.length,
        });

        productRepositoryMock.find.mockResolvedValueOnce(deletedProducts);

        await syncProductsService.syncProducts();
      });

      it('calls contentful client', () => {
        expect(contentfulClientMock.getEntries).toHaveBeenCalledTimes(1);
        expect(contentfulClientMock.getEntries).toHaveBeenCalledWith({
          content_type: 'product',
          limit: CONTENTFUL_BATCH_SIZE,
          skip: 0,
          'fields.sku[nin]': deletedProductsIds,
        });
      });

      it('calls product repository', () => {
        expect(productRepositoryMock.create).toHaveBeenCalledTimes(contentulProductEntries.length);
        expect(productRepositoryMock.save).toHaveBeenCalledTimes(1);
      });
    });
  });
});
