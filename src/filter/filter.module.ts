import { Module } from '@nestjs/common';
import { FilterController } from './filter.controller';
import { FilterService } from './filter.Service';
import { TourEntity } from 'src/entities/tour.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TourEntity])],
  controllers: [FilterController],
  providers: [FilterService],
})
export class FilterModule {}
