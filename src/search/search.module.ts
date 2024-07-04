import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SearchRepository } from './search.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourEntity } from 'src/entities/tour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TourEntity])],
  controllers: [SearchController],
  providers: [SearchService, SearchRepository]
})
export class SearchModule {}
