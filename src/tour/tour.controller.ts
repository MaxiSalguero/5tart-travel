import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TourService } from './tour.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTourDto, ImgDto, UpdateTourDto } from 'src/DTOS/CreateTour.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import path from 'path';
import { TourEntity } from 'src/entities/tour.entity';

@ApiTags('tours')
@Controller('tours')
export class tourController {
  constructor(private tourService: TourService) {}

  @Get()
  getTours() {
    return this.tourService.getTours();
  }

  @Get('/bus')
  getToursBus() {
    return this.tourService.getToursBus();
  }

  @Get('/plane')
  getToursPlane() {
    return this.tourService.getToursPlane();
  }

  @Get('/oferta')
  getToursOferta() {
    return this.tourService.getToursOferta();
  }

  @Get(':id')
  getTourById(@Param('id', ParseUUIDPipe) id: string) {
    return this.tourService.getTourById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  createTour(@Body() tour: CreateTourDto, @Req() req) {
    const userId = req.user.id;
    console.log(userId);

    return this.tourService.createTour(tour, userId);
  }

  @Post('mailOfertas')
  async mailOfertas(@Body('email') email: string): Promise<void> {
    try {
      await this.tourService.mailoferta(email);
    } catch (error) {
      throw new Error(`Error al enviar el correo de ofertas: ${error.message}`);
    }
  }

  @Put(':id')
  updateTour(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() tour: UpdateTourDto,
  ) {
    return this.tourService.updateTour(id, tour);
  }

  @Delete(':id')
  deleteTour(@Param('id', ParseUUIDPipe) id: string) {
    return this.tourService.deleteTour(id);
  }

  @Post('addImg/:id')
  addTourImg(@Param('id', ParseUUIDPipe) id: string, @Body() imgUrl: ImgDto[]) {
    return this.tourService.addTourImg(id, imgUrl);
  }

  @Delete('deleteImg/:id')
  removeTourImg(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() removeTourImgDto: ImgDto,
  ) {
    const {imgUrl} = removeTourImgDto
    return this.tourService.removeTourImg(id, imgUrl);
  }
}
