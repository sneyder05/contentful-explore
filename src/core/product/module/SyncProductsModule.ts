import { Module } from '@nestjs/common';
import { SyncProductsService } from '../service/SyncProductsService';
import { ScheduleModule } from '@nestjs/schedule';
import { ContentfulModule } from 'src/core/contentful/module/ContentfulModule';
import { Product } from '../entity/Product';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeletedProductsService } from '../service/DeletedProductsService';
import { DeletedProduct } from '../entity/DeletedProduct';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([Product, DeletedProduct]), ContentfulModule],
  providers: [SyncProductsService, DeletedProductsService],
})
export class SyncProductsModule {}
