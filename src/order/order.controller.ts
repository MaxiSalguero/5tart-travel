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
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/user/role.enum';
import { GlobalGuard } from 'src/guards/global.guard';

@ApiTags('Order')
@UseGuards(GlobalGuard)
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiBearerAuth()
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

  @ApiBearerAuth()
  @Roles(Role.User)
  @Get('user')
  getMyOrders(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.orderService.getMyOrders(userId);
  }
}
