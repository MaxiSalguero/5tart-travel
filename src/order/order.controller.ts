import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from 'src/DTOS/CreateOrder.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Order')
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService){}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    addOrder(@Body() order: CreateOrderDto, @Req() req) {
        const userId = req.user.id 
        console.log(userId);
        
        
        return this.orderService.addOrder(order, userId)     
    }

    @Get()
    getOrder(){
        return this.orderService.getOrder()
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('user')
    getMyOrder(@Req() req) {
        const userId = req.user.id 
        return this.orderService.getMyOrder(userId)
    }

}
