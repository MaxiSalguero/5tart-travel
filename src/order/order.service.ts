import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
    constructor(private orderRepository: OrderRepository ){}
    
    getMyOrder(userId) {
        return this.orderRepository.getMyOrder(userId)     
    }
    getOrder() {
        return this.orderRepository.getOrder()     
    }
    addOrder(order, userId) {
        return this.orderRepository.addOrder(order, userId)     
    }
}
