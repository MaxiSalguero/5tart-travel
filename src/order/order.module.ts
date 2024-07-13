import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/entities/order.entity';
import { UserEntity } from 'src/entities/user.entity';
import { AgencyEntity } from 'src/entities/agency.entity';
import { TourEntity } from 'src/entities/tour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity, AgencyEntity, TourEntity])],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
