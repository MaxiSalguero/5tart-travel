import { Controller, Get, Query, Req } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('search')
export class SearchController {
    constructor(private searchservice: SearchService){}

    @Get()
    @ApiQuery({ name: 'q', required: false })  
    searchGeneral(@Query('q') query: string){
        return this.searchservice.searchLupa(query)
    }

}
