import { Controller, Get, Query } from '@nestjs/common';
import { FilterService } from './filter.Service';
import { TourEntity } from 'src/entities/tour.entity';


@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: FilterService) {}

  @Get('filter')
  async filterToursByLocation(
    @Query('country') country: string,
    @Query('region') region: string,
    @Query('state') state: string,
  ): Promise<TourEntity[]> {
    return this.toursService.findByLocation(country, region, state);
  }
}