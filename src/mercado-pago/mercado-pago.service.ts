import { Injectable } from '@nestjs/common';
import MercadoPagoConfig, { Preference } from 'mercadopago';
import { mercadoDto } from 'src/DTOS/CreateOrderData.dto';
import { v4 as uuid } from "uuid"


@Injectable()
export class MercadoPagoService {
    private client = new MercadoPagoConfig({
        accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN
      });
    
    
      async createPreference(orderData: mercadoDto) {
        
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
              success: "https://5tart-travel-frontend.vercel.app/dashboard/compras" ,
              // failure: process.env.MP_FAILURE_URL,
              // pending: process.env.MP_PENDING_URL,
            },
            auto_return: 'approved',
          };
    
          const preference = new Preference(this.client)
          const result = await preference.create({ body })
          
          console.log(body);
          console.log(result.id);
          
          return result.id
          
      }
}
