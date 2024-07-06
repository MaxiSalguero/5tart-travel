import {
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
import { AgencyServices } from './agency.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('agency')
@Controller('agency')
export class agencyController {
  constructor(private agencyService: AgencyServices) {}

  @Get()
  getAgency() {
    return this.agencyService.getAgency();
  }

  @Get(':id')
  getByIdAgency(@Param('id', ParseUUIDPipe) id: string) {
    return this.agencyService.getByIdAgency(id);
  }

  @Delete(':id')
  deleteAgency(@Param('id', ParseUUIDPipe) id: string) {
    return this.agencyService.deleteAgency(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete('tour/:id')
  deleteTour(@Param('id', ParseUUIDPipe) id: string, @Req() request) {
    const agencyId = request.user.id;

    return this.agencyService.deleteTour(id, agencyId);
  }

  @Put('active/:id')
  activeAgency(@Param('id', ParseUUIDPipe) id: string) {
    return this.agencyService.activeAgency(id);
  }

  @Put('disable/:id')
  disableAgency(@Param('id', ParseUUIDPipe) id: string) {
    return this.agencyService.disableAgency(id);
  }
}
