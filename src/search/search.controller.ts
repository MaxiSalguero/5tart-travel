import { Controller, Get, Query, Req } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private searchservice: SearchService) {}

  @Get()
  @ApiQuery({ name: 'q', required: false })
  searchGeneral(@Query('q') query: string) {
    return this.searchservice.searchLupa(query);
  }
}
