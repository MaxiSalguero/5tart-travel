import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { OrderEntity } from 'src/entities/order.entity';
import { CreateOrderDto } from 'src/DTOS/CreateOrder.dto';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  getMyOrder(userId) {
    return this.orderRepository.getMyOrder(userId);
  }
  getOrder() {
    return this.orderRepository.getOrder();
  }
  addOrder(order, userId: string, agencyId: string) {
    return this.orderRepository.addOrder(order, userId, agencyId);
  }
}
