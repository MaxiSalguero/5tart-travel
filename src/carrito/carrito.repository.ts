import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ShelterOrderDto } from "src/dto/shelterOrderDto";
import { OrderDetailsEntity } from "src/entidades/orderDetail.entity";
import { OrdersEntity } from "src/entidades/orders.entity";
import { ShelterEntity } from "src/entidades/shelter.entity";
import { UserEntity } from "src/entidades/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class CarritoRepository {
    constructor(
        @InjectRepository(OrdersEntity)
        private ordersRepository: Repository<OrdersEntity>,
        @InjectRepository(OrderDetailsEntity)
        private ordersDetailsRepository: Repository<OrderDetailsEntity>,
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        @InjectRepository(ShelterEntity)
        private shelterRepository: Repository<ShelterEntity>,

    ) { }

    async getOrder(uid) {
        const order = await this.ordersRepository.find({
            where: { id: uid },
            relations: {
                orderdetails: {
                    shelters: true
                },
            },
        });

        if (!order) {
            return `Orden con id ${uid} no encontrada`
        }

        return order;
    }

    async addOrder(userId, shelters) {
        let total = 0;

        const user = await this.usersRepository.findOneBy({ id: userId })
        if (!user) {
            throw new BadRequestException(`Usuario con id ${userId} no encontrado`);

        }

        const order = new OrdersEntity();
        order.date = new Date();
        order.user = user

        const newOrder = await this.ordersRepository.save(order);

        const sheltersArray = await Promise.all(
            shelters.map(async (element: ShelterOrderDto) => {
                const shelter = await this.shelterRepository.findOneBy({
                    id: element.id,
                });

                if (!shelter) {
                    throw new BadRequestException(`Producto con id ${element.id} no encontrado`);
                }


                total += Number(element.price);


                return shelter;

            }),
        );

        const orderDetail: OrderDetailsEntity = new OrderDetailsEntity();

        orderDetail.totalPrice = Number(total);
        orderDetail.shelters = sheltersArray;
        orderDetail.order = newOrder;

        await this.ordersDetailsRepository.save(orderDetail);



        return await this.ordersRepository.find({
            where: { id: newOrder.id },
            relations: {
                orderdetails: true
            },
        })
    }

} 