import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './users.entity';
import { OrderDetailsEntity } from './orderDetail.entity';

@Entity({
  name: 'orders',
})
export class OrdersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  date: Date;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => OrderDetailsEntity, (orderDetails) => orderDetails.order)
  orderdetails: OrderDetailsEntity;
}
