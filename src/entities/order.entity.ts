import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { AgencyEntity } from './agency.entity';

@Entity({
  name: 'order',
})
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({
    default: false,
  })
  isFinished: boolean;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => AgencyEntity, (agency) => agency.orders)
  @JoinColumn()
  agency: AgencyEntity;
}
