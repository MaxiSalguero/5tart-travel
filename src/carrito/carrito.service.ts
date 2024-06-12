import { Injectable } from '@nestjs/common';
import { CarritoRepository } from './carrito.repository';
import { ShelterOrderDto } from '../dto/shelterOrderDto';

@Injectable()
export class CarritoService {
  constructor(private carritoRepository: CarritoRepository) {}

  addOrder(order, userId: string) {
    return this.carritoRepository.addOrder(order, userId);
  }

  getOrder(id: string) {
    return this.carritoRepository.getOrder(id);
  }
}
