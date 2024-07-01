import { Module } from '@nestjs/common';
import { filterController } from './filter.controller';
import { filterService } from './filter.Service';
import { tourModule } from 'src/tour/tour.module';
import { TourEntity } from 'src/entities/tour.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TourEntity])],
  controllers: [filterController],
  providers: [filterService],
})
export class filterModule {}
