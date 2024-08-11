import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from 'src/DTOS/CreateOrder.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/user/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Roles(Role.User)
  @Post(':id')
  addOrder(
    @Param('id', ParseUUIDPipe) tourId: string,
    @Req() req: RequestWithUser,
    @Body() order: CreateOrderDto,
  ) {
    const userId = req.user.id;

    return this.orderService.addOrder(tourId, userId, order);
  }

  @Get()
  getOrders() {
    return this.orderService.getOrders();
  }

  @Roles(Role.User)
  @Get('user')
  getMyOrders(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.orderService.getMyOrders(userId);
  }
}
