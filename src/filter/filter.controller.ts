import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilterService } from './filter.Service';

@ApiTags('Filter')
@Controller('filter')
export class FilterController {
  constructor(private readonly filterservice: FilterService) {}

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
  ) {
    return this.filterservice.searchGeneral(price, country, region, state);
  }
}
