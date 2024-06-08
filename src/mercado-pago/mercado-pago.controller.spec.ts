import { Test, TestingModule } from '@nestjs/testing';
import { MercadoPagoController } from './mercado-pago.controller';

describe('MercadoPagoController', () => {
  let controller: MercadoPagoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MercadoPagoController],
    }).compile();

    controller = module.get<MercadoPagoController>(MercadoPagoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
