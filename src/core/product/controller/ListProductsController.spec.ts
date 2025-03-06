import { Test } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { enableGlobalValitadion } from '../../../bootstrap/enableGlobalValitadion';
import { AuthGuard } from '../../../../src/auth/guard/AuthGuard';
import { ListProductsController } from './ListProductsController';
import { ListProductsService } from '../service/ListProductsService';
import { Server } from 'net';

describe(ListProductsController.name, () => {
  let app: INestApplication<Server>;

  const listProductsServiceMock = {
    list: jest.fn(),
  };

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [ListProductsController],
      providers: [{ provide: ListProductsService, useValue: listProductsServiceMock }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = testingModule.createNestApplication();

    enableGlobalValitadion(app);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(jest.clearAllMocks);

  describe('when success', () => {
    it('returns a 200', async () => {
      await request(app.getHttpServer()).get('/products').expect(200);
    });
  });

  describe('when fail', () => {
    it.each([
      {
        case: 'pageSize is greater than max value',
        input: {
          pageSize: 10,
        },
        expectedMsg: 'pageSize must not be greater than 5',
      },
      {
        case: 'pageSize is less than min value',
        input: {
          pageSize: 0,
        },
        expectedMsg: 'pageSize must be a positive number',
      },
      {
        case: 'pageNumber is less than min value',
        input: {
          pageNumber: 0,
        },
        expectedMsg: 'pageNumber must be a positive number',
      },
      {
        case: 'minPrice is less than min value',
        input: {
          minPrice: 0,
        },
        expectedMsg: 'minPrice must be a positive number',
      },
      {
        case: 'maxPrice is less than min value',
        input: {
          maxPrice: 0,
        },
        expectedMsg: 'maxPrice must be a positive number',
      },
    ])('$case', async ({ input, expectedMsg }) => {
      await request(app.getHttpServer())
        .get('/products')
        .query(input)
        .expect(400)
        .then((response) => {
          expect(response.body.message).toContainEqual(expectedMsg);
        });
    });
  });
});
