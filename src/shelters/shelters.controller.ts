import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  Put,
} from '@nestjs/common';
import { SheltersService } from './shelters.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateShelterDto } from 'src/dto/updateShelter.dto';

@ApiTags('Shelters')
@Controller('shelters')
export class SheltersController {
  constructor(private readonly sheltersService: SheltersService) {}

  @Get()
  getShelters() {
    return this.sheltersService.getShelters();
  }

  @Get(':id')
  getShelterById(@Param('id', ParseUUIDPipe) id: string) {
    return this.sheltersService.getShelterById(id);
  }

  @Put('profile')
  updatedProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateShelterDto,
  ) {
    return this.sheltersService.updatedProfile(id, user);
  }

  @Post('active/:id')
  activeShelter(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
    return this.sheltersService.activeShelter(id);
  }

  @Post(':id')
  deleteShelter(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
    return this.sheltersService.deleteShelter(id);
  }
}
