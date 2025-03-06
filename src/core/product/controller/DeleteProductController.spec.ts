import { Test } from '@nestjs/testing';
import request from 'supertest';
import { DeleteProductController } from './DeleteProductController';
import { DeleteProductService } from '../service/DeleteProductService';
import { INestApplication } from '@nestjs/common';
import { enableGlobalValitadion } from '../../../bootstrap/enableGlobalValitadion';
import { AuthGuard } from '../../../../src/auth/guard/AuthGuard';
import { Server } from 'net';

describe(DeleteProductController.name, () => {
  let app: INestApplication<Server>;

  const deleteProductServiceMock = {
    deleteProduct: jest.fn(),
  };

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [DeleteProductController],
      providers: [{ provide: DeleteProductService, useValue: deleteProductServiceMock }],
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
    it('returns a 204', async () => {
      await request(app.getHttpServer()).delete('/products/1').expect(204);

      expect(deleteProductServiceMock.deleteProduct).toHaveBeenCalledTimes(1);
      expect(deleteProductServiceMock.deleteProduct).toHaveBeenCalledWith('1');
    });
  });
});
