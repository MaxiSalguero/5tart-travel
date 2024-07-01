import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TourService } from './tour.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTourDto } from 'src/DTOS/CreateTour.dto';
import { AuthGuard } from 'src/guards/auth.guard';

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

  @Delete(':id')
  deleteTour(@Param('id', ParseUUIDPipe) id: string) {
    return this.tourService.deleteTour(id);
  }
}
