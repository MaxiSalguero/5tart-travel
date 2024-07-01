import { Controller, Delete, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { AgencyServices } from './agency.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('agency')
@Controller('agency')
export class agencyController {
  constructor(private agencyService: AgencyServices) {}

  @Get()
  getAgency() {
    return this.agencyService.getAgency();
  }

  @Delete(':id')
  deleteAgency(@Param('id', ParseUUIDPipe) id: string) {
    return this.agencyService.deleteAgency(id);
  }
}
