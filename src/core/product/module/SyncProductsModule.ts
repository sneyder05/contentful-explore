import { Module } from '@nestjs/common';
import { SyncProductsService } from '../service/SyncProductsService';
import { ScheduleModule } from '@nestjs/schedule';
import { ContentfulModule } from '../../../../src/core/contentful/module/ContentfulModule';
import { Product } from '../entity/Product';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([Product]), ContentfulModule],
  providers: [SyncProductsService],
})
export class SyncProductsModule {}
