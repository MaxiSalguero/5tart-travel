import { Module } from '@nestjs/common';
import {  MercadoPagoService } from './mercado-pago.service';
import { MercadoPagoController } from './mercado-pago.controller';

@Module({
  providers: [MercadoPagoService],
  exports:[MercadoPagoService],
  controllers: [MercadoPagoController]
})
export class MercadoPagoModule {}
