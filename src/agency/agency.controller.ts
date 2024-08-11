import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AgencyServices } from './agency.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/user/role.enum';
import { RequestWithUser } from 'src/interfaces/requestWithUser';

@ApiTags('Agency')
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
  @UseGuards(AuthGuard, RolesGuard)
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('active/:id')
  activeAgency(@Param('id', ParseUUIDPipe) id: string) {
    return this.agencyService.activeAgency(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('disable/:id')
  disableAgency(@Param('id', ParseUUIDPipe) id: string) {
    return this.agencyService.disableAgency(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Agency)
  @Delete('orders/amount')
  emptyTotalAmount(@Req() request: RequestWithUser) {
    const agencyId = request.user.id;

    return this.agencyService.emptyTotalAmount(agencyId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
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
