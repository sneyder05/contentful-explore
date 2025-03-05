import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/ConfigService';
import { DatabaseModule } from './database/DatabaseModule';

@Module({
  imports: [AppConfigModule, DatabaseModule],
})
export class AppModule {}
