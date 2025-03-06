import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigKey } from './config/ConfigKey';
import { setUpOpenApi } from './bootstrap/setUpOpenApi';
import { enableGlobalValitadion } from './bootstrap/enableGlobalValitadion';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = app.get(ConfigService).get<number>(ConfigKey.PORT, 3000);

  // Swagger
  setUpOpenApi(app);

  // Global Validation
  enableGlobalValitadion(app);

  await app.listen(port);

  Logger.log(`🚀 Server is running on port: ${port}`);
}

bootstrap();
