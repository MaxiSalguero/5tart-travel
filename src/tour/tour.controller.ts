import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { TourService } from "./tour.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateTourDto } from "src/DTOS/CreateTour.dto";

@ApiTags('Tours')
@Controller('tours')
export class tourController {
    constructor(private tourService: TourService){}

    @Get()
    getTours(){
        return this.tourService.getTours()
    }

    @Post()
    createAgency(@Body() tour: CreateTourDto){
        return this.tourService.createAgency(tour)
    }

    @Delete(':id')
    deleteAgency(@Param('id', ParseUUIDPipe) id:string,){
        return this.tourService.deleteAgency(id)
    }
}