import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserEntity } from './user.entity';
import { AgencyEntity } from './agency.entity';

@Entity({
  name: 'order',
})
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column()
  price: number;

  @Column({
    default: new Date(),
  })
  date: Date;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => AgencyEntity, (agency) => agency.orders)
  @JoinColumn()
  agency: AgencyEntity;
}
