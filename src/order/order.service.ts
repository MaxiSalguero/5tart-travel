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
  addOrder(orderid, userId: string, order: CreateOrderDto) {
    return this.orderRepository.addOrder(orderid, userId, order);
  }
}
