import { Injectable } from '@nestjs/common';
import { CarritoRepository } from './carrito.repository';
import { ShelterOrderDto } from '../dto/shelterOrderDto';

@Injectable()
export class CarritoService {
  constructor(private carritoRepository: CarritoRepository) {}

  addOrder(shelters: ShelterOrderDto[], userId: string) {
    return this.carritoRepository.addOrder(userId, shelters);
  }

  getOrder(id: string) {
    return this.carritoRepository.getOrder(id);
  }

}
