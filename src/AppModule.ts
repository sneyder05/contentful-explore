import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/ConfigService';
import { DatabaseModule } from './database/DatabaseModule';
import { ProductModule } from './core/product/module/ProductModule';
import { ReportsModule } from './core/reports/module/ReportsModule';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth/guard/AuthGuard';

@Module({
  imports: [AppConfigModule, DatabaseModule, ProductModule, ReportsModule, JwtModule],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
