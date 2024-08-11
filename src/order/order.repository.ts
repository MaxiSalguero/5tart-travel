import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/DTOS/CreateOrder.dto';
import { OrderEntity } from 'src/entities/order.entity';
import { TourEntity } from 'src/entities/tour.entity';
import { UserEntity } from 'src/entities/user.entity';
import { MailsServices } from 'src/mails/mails.service';
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
    private readonly mailservices: MailsServices,
  ) {}

  getOrders() {
    return this.orderRepository.find({ relations: { user: true } });
  }

  async getMyOrders(userId: string) {
    const myOrders: OrderEntity[] = await this.orderRepository.find({
      relations: { user: true },
      where: { user: { id: userId } },
    });
    if (myOrders.length == 0) {
      return 'No hay ordenes actualmente';
    }
    return myOrders;
  }

  async addOrder(tourId: string, userId: string, order: CreateOrderDto) {
    const user: UserEntity = await this.userRepository.findOne({
      where: { id: userId },
    });
    const tour: TourEntity = await this.tourRepository.findOne({
      where: { id: tourId },
      relations: { agency: true },
    });

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
    if (!tour) {
      throw new BadRequestException('Agencia no encontrada');
    }

    const { agency } = tour;

    const newOrder: OrderEntity = this.orderRepository.create({
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
    await this.mailservices.sendConfirmCompra(
      user.mail,
      user.username,
      agency.name_agency,
      tour.title,
      order.price,
    );

    return newOrder;
  }
}
