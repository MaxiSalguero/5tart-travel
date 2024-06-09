import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateOrderDto } from 'src/dto/CreateOrderDto';
import { CarritoService } from './carrito.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Carrito')
@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoServices: CarritoService) {}

  @Post()
  addOrder(@Body() order: CreateOrderDto) {
    const { userId, shelters } = order;
    return this.carritoServices.addOrder(userId, shelters);
  }

  @Get(':id')
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.carritoServices.getOrder(id);
  }
}
