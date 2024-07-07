import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { CreateOrderDto } from 'src/DTOS/CreateOrder.dto';
import { OrderEntity } from 'src/entities/order.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
    constructor(@InjectRepository(OrderEntity)
                private readonly orderRepository: Repository<OrderEntity>,
                @InjectRepository(UserEntity)
                private readonly userRepository: Repository<UserEntity>){}

    getOrder() {
        return this.orderRepository.find({relations: {user: true}})
    }

    async getMyOrder(userId) {
        const myOrders: OrderEntity[] = await this.orderRepository.find({relations: {user: true}, where: {user: {id: userId}}})
        if (myOrders.length == 0) {
            return 'No hay ordenes actualmente'
        }
        return myOrders;
    }

    async addOrder(order: CreateOrderDto, userId: string) {
        const user: UserEntity = await this.userRepository.findOne({where: { id: userId},});

        if (!user) {
            throw new BadRequestException('Usuario id no encontrado')
        }

        const newOrder: OrderEntity = await this.orderRepository.create({...order, user: user});

        if (!newOrder) {
            throw new Error('Error al crear la orden')
        }
        await this.orderRepository.save(newOrder);

        if (!user.orders) {
            user.orders = [];
        }

        user.orders.push(newOrder);
        await this.userRepository.save(user);
        

        return newOrder
    }
}
