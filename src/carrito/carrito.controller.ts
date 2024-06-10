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
import { CreateOrderDto } from 'src/dto/CreateOrderDto';
import { CarritoService } from './carrito.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';

@ApiTags('Carrito')
@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoServices: CarritoService) {}

  @UseGuards(AuthGuard)
  @Post()
  addOrder(@Body() order: CreateOrderDto, @Req() request) {
    const { shelters } = order;

    const userId = request.user.id

    return this.carritoServices.addOrder( shelters, userId );
  }

  @Get(':id')
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.carritoServices.getOrder(id);
  }

}
