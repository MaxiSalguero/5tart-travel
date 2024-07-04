import { Body, Controller, Post } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { mercadoDto } from 'src/DTOS/CreateOrderData.dto';

@Controller('mercado-pago')
export class MercadoPagoController {
    constructor( private mercadoServicios: MercadoPagoService ){}

    @Post()
    createPreference(@Body() orderData: mercadoDto){
        return this.mercadoServicios.createPreference(orderData)
    }
}
