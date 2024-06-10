import { Module } from '@nestjs/common';
import { CarritoController } from './carrito.controller';
import { CarritoService } from './carrito.service';
import { CarritoRepository } from './carrito.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from 'src/entidades/orders.entity';
import { OrderDetailsEntity } from 'src/entidades/orderDetail.entity';
import { UserEntity } from 'src/entidades/users.entity';
import { ShelterEntity } from 'src/entidades/shelter.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([OrdersEntity,OrderDetailsEntity,UserEntity,ShelterEntity])],
  controllers: [CarritoController],
  providers: [CarritoService, CarritoRepository, JwtService]
})
export class CarritoModule {}
