import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/ConfigService';
import { DatabaseModule } from './database/DatabaseModule';
import { ProductModule } from './core/product/module/ProductModule';

@Module({
  imports: [AppConfigModule, DatabaseModule, ProductModule],
})
export class AppModule {}
