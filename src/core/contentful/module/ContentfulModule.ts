import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'contentful';
import { ConfigKey } from '../../../../src/config/ConfigKey';
import { CONTENTFUL_CLIENT } from '../util/ContenfulConstants';

@Module({
  providers: [
    {
      provide: CONTENTFUL_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return createClient({
          space: configService.getOrThrow<string>(ConfigKey.CONTENTFUL_SPACE_ID),
          accessToken: configService.getOrThrow<string>(ConfigKey.CONTENTFUL_ACCESS_TOKEN),
          environment: configService.getOrThrow<string>(ConfigKey.CONTENTFUL_ENVIRONMENT, 'master'),
        });
      },
    },
  ],
  exports: [CONTENTFUL_CLIENT],
})
export class ContentfulModule {}
