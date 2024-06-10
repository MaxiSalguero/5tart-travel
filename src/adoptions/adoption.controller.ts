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
import { AdoptionService } from './adoption.service';
import { CreateAdopcionDto } from 'src/dto/createAdopcion.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Adoption')
@Controller('adoption')
export class AdoptionController {
  constructor(private readonly adopcionservice: AdoptionService) {}

  @Get()
  async AllAdoptions() {
    return await this.adopcionservice.AllAdoptions();
  }

  @Get(':id')
  async adoptionsById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.adopcionservice.adoptionsById(id);
  }

  @UseGuards(AuthGuard)
  @Post('new/:id')
  async newAdoption(@Param('id') petid: string, @Req() request) {
    const userId = request.user.id;
    return await this.adopcionservice.newAdoption(userId, petid);
  }

  @Post('activate/:id')
  async activateAdoption(@Param('id', ParseUUIDPipe) adoptionId: string) {
    return await this.adopcionservice.activateAdoption(adoptionId);
  }

  @Delete('delete/:id')
  async Deleteadoption(@Param('id', ParseUUIDPipe) id: string) {
    return await this.adopcionservice.Delete(id);
  }

  @Get('user/:id')
  async adoptionUser(@Param('id', ParseUUIDPipe) userid: string) {
    return await this.adopcionservice.adoptionUser(userid);
  }
}
