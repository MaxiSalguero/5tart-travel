import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from 'src/DTOS/CreateOrder.dto';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  getMyOrders(userId: string) {
    return this.orderRepository.getMyOrders(userId);
  }
  getOrders() {
    return this.orderRepository.getOrders();
  }
  addOrder(orderId: string, userId: string, order: CreateOrderDto) {
    return this.orderRepository.addOrder(orderId, userId, order);
  }
}
