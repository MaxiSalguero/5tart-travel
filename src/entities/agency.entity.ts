import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { TourEntity } from './tour.entity';
import { OrderEntity } from './order.entity';

@Entity({
  name: 'agency',
})
export class AgencyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  name_agency: string;

  @Column()
  mail: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column({
    nullable: true,
    type: 'text',
    default:
      'https://res.cloudinary.com/dia2gautk/image/upload/v1719807466/logo_start_hy9j22.webp',
  })
  imgUrl?: string;

  @Column({
    nullable: true,
    default: false,
  })
  isActive: boolean;

  @Column({ nullable: true })
  role: string;

  @OneToMany(() => TourEntity, (tours) => tours.agency)
  @JoinColumn()
  tours: TourEntity[];

  @OneToMany(() => OrderEntity, (orders) => orders.agency)
  @JoinTable()
  orders: OrderEntity[];
}
