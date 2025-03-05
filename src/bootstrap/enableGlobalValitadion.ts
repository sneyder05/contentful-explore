import { INestApplication, ValidationPipe } from '@nestjs/common';

export function enableGlobalValitadion(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      stopAtFirstError: true,
      forbidUnknownValues: true,
    }),
  );
}
