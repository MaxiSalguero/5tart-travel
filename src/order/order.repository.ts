import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/DTOS/CreateOrder.dto';
import { AgencyEntity } from 'src/entities/agency.entity';
import { OrderEntity } from 'src/entities/order.entity';
import { TourEntity } from 'src/entities/tour.entity';
import { UserEntity } from 'src/entities/user.entity';
import { mailsServices } from 'src/mails/mails.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TourEntity)
    private readonly tourRepository: Repository<TourEntity>,
    private readonly mailservices:mailsServices
  ) {}

  getOrder() {
    return this.orderRepository.find({ relations: { user: true } });
  }

  async getMyOrder(userId) {
    const myOrders: OrderEntity[] = await this.orderRepository.find({
      relations: { user: true },
      where: { user: { id: userId } },
    });
    if (myOrders.length == 0) {
      return 'No hay ordenes actualmente';
    }
    return myOrders;
  }

  async addOrder(
    tourid: string,
    userId: string
  ) {
    const user: UserEntity = await this.userRepository.findOne({
      where: { id: userId },
    });
    const tour: TourEntity = await this.tourRepository.findOne({
      where: { id: tourid },
      relations: { agency: true }
    });

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
    if (!tour) {
      throw new BadRequestException('Agencia no encontrada');
    }


    const order: CreateOrderDto = { title: tour.title, price: tour.price }

    const { agency } = tour


    const newOrder: OrderEntity = await this.orderRepository.create({
      ...order,
      user: user,
      agency: agency,
    });

    if (!newOrder) {
      throw new Error('Error al crear la orden');
    }

    await this.orderRepository.save(newOrder);

    if (!user.orders) {
      user.orders = [];
    }

    user.orders.push(newOrder);
    
    await this.userRepository.save(user);
    await this.mailservices.sendConfirmCompra(user.mail,user.username,agency.name_agency,tour.title,order.price)
    


    return newOrder;
  }
}
