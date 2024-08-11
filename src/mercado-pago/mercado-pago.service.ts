import { Injectable } from '@nestjs/common';
import MercadoPagoConfig, { Preference } from 'mercadopago';
import { MercadoDto } from 'src/DTOS/CreateOrderData.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MercadoPagoService {
  private client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  });

  async createPreference(orderData: MercadoDto) {
    const body = {
      items: [
        {
          id: uuid(),
          title: orderData.title,
          quantity: 1,
          unit_price: orderData.price,
        },
      ],
      back_urls: {
        success: 'https://5tart-travel-frontend.vercel.app/dashboard/compras',
      },
      auto_return: 'approved',
    };

    const preference = new Preference(this.client);
    const result = await preference.create({ body });

    return result.id;
  }
}
