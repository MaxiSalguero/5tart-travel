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
import { CarritoService } from './carrito.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { ShelterOrderDto } from 'src/dto/shelterOrderDto';

@ApiTags('Carrito')
@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoServices: CarritoService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  addOrder(@Body() order: ShelterOrderDto[], @Req() request) {
    const userId = request.user.id;

    return this.carritoServices.addOrder(order, userId);
  }

  @Get(':id')
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.carritoServices.getOrder(id);
  }
}
