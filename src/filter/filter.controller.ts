import { Controller, Get, Query } from '@nestjs/common';
import { TourEntity } from 'src/entities/tour.entity';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { filterService } from './filter.Service';

@ApiTags('filter')
@Controller('filter')
export class filterController {
  constructor(private readonly filterservice: filterService) { }

  @Get()
  @ApiQuery({ name: 'country', required: false })
  @ApiQuery({ name: 'region', required: false })
  @ApiQuery({ name: 'state', required: false })
  @ApiQuery({ name: 'price', required: false })
  async filterToursByLocation(
    @Query('country') country: string,
    @Query('region') region: string,
    @Query('state') state: string,
    @Query('price') price: number,
  ): Promise<TourEntity[]> {
    return this.filterservice.searchGeneral(price, country, region, state);
  }
}