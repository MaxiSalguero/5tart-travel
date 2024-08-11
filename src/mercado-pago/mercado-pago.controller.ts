import { Body, Controller, Post } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { MercadoDto } from 'src/DTOS/CreateOrderData.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Mercado-pago')
@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private mercadoServicios: MercadoPagoService) {}

  @Post()
  createPreference(@Body() orderData: MercadoDto) {
    return this.mercadoServicios.createPreference(orderData);
  }
}
