import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TourService } from './tour.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTourDto, ImgDto, UpdateTourDto } from 'src/DTOS/CreateTour.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/user/role.enum';

@ApiTags('Tours')
@Controller('tours')
export class TourController {
  constructor(private tourService: TourService) {}

  // Agency Methods
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Agency)
  @Post()
  createTour(@Body() tour: CreateTourDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;

    return this.tourService.createTour(tour, userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Agency)
  @Post('addImg/:id')
  addTourImg(@Param('id', ParseUUIDPipe) id: string, @Body() imgUrl: ImgDto[]) {
    return this.tourService.addTourImg(id, imgUrl);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Agency)
  @Put(':id')
  updateTour(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() tour: UpdateTourDto,
  ) {
    return this.tourService.updateTour(id, tour);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Agency)
  @Delete('deleteImg/:id')
  removeTourImg(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() removeTourImgDto: ImgDto,
  ) {
    const { imgUrl } = removeTourImgDto;
    return this.tourService.removeTourImg(id, imgUrl);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  deleteTour(@Param('id', ParseUUIDPipe) id: string) {
    return this.tourService.deleteTour(id);
  }

  // Other Methods
  @Post('mailOfertas')
  async mailOfertas(@Body('email') email: string): Promise<void> {
    try {
      await this.tourService.mailoferta(email);
    } catch (error) {
      throw new Error(`Error al enviar el correo de ofertas: ${error.message}`);
    }
  }

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
}
