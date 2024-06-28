import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Req, UseGuards } from "@nestjs/common";
import { TourService } from "./tour.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateTourDto } from "src/DTOS/CreateTour.dto";
import { AuthGuard } from "src/guards/auth.guard";

@ApiTags('Tours')
@Controller('tours')
export class tourController {
    constructor(private tourService: TourService){}

    @Get()
    getTours(){
        return this.tourService.getTours()
    }

    @Get('/bus')
    getToursBus(){
        return this.tourService.getToursBus()
    }

    @Get('/plane')
    getToursPlane(){
        return this.tourService.getToursPlane()
    }

    @Get('/oferta')
    getToursOferta(){
        return this.tourService.getToursOferta()
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    createTour(@Body() tour: CreateTourDto, @Req() req){
        const userId = req.user.id
        console.log(userId);
        

        return this.tourService.createTour(tour, userId)
    }

    @Delete(':id')
    deleteAgency(@Param('id', ParseUUIDPipe) id:string,){
        return this.tourService.deleteAgency(id)
    }
}