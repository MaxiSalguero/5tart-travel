import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AgencyServices } from './agency.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/user/role.enum';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { GlobalGuard } from 'src/guards/global.guard';

@ApiTags('Agency')
@UseGuards(GlobalGuard)
@Controller('agency')
export class AgencyController {
  constructor(private agencyService: AgencyServices) {}

  @Get()
  getAgencies() {
    return this.agencyService.getAgencies();
  }

  @Get('disable')
  getDisableAgencies() {
    return this.agencyService.getDisableAgencies();
  }

  @Get('disable/seen')
  getSeenDisableAgency() {
    return this.agencyService.getSeenDisableAgency();
  }

  @ApiBearerAuth()
  @Roles(Role.Agency)
  @Get('totalMount')
  getTotalMount(@Req() request: RequestWithUser) {
    const agencyId = request.user.id;

    return this.agencyService.getTotalMount(agencyId);
  }

  @Get(':id')
  getByIdAgency(@Param('id', ParseUUIDPipe) id: string) {
    return this.agencyService.getByIdAgency(id);
  }

  @Put('/disable/seen/:id')
  putSeenDisableAgency(@Param('id', ParseUUIDPipe) id: string) {
    return this.agencyService.putSeenDisableAgency(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Put('active/:id')
  activeAgency(@Param('id', ParseUUIDPipe) id: string) {
    return this.agencyService.activeAgency(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Put('disable/:id')
  disableAgency(@Param('id', ParseUUIDPipe) id: string) {
    return this.agencyService.disableAgency(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Agency)
  @Delete('orders/amount')
  emptyTotalAmount(@Req() request: RequestWithUser) {
    const agencyId = request.user.id;

    return this.agencyService.emptyTotalAmount(agencyId);
  }

  @ApiBearerAuth()
  @Roles(Role.Agency)
  @Delete('tour/:id')
  deleteTour(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: RequestWithUser,
  ) {
    const agencyId = request.user.id;

    return this.agencyService.deleteTour(id, agencyId);
  }

  @Delete(':id')
  deleteAgency(@Param('id', ParseUUIDPipe) id: string) {
    return this.agencyService.deleteAgency(id);
  }
}
