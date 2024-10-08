import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TourEntity } from './tour.entity';
import { OrderEntity } from './order.entity';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  username: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  mail: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({ nullable: true })
  birthday: Date;

  @Column({
    nullable: true,
    default: true,
  })
  isActive: boolean;

  @Column({
    nullable: true,
    default: false,
  })
  isSeen: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @BeforeInsert()
  setDate() {
    this.date = new Date();
  }

  @Column({
    nullable: true,
    default: 'user',
  })
  role: string;

  @ManyToMany(() => TourEntity, (favorite_tours) => favorite_tours.user)
  @JoinTable()
  favorite_tours: TourEntity[];

  @ManyToMany(() => OrderEntity, (orders) => orders.user)
  @JoinTable()
  orders: OrderEntity[];
}
