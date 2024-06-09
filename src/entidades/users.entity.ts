import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { DonationEntity } from './donation.entity';
import { AdoptionEntity } from './adoption.entity';
import { OrdersEntity } from './orders.entity';
import { ShelterEntity } from './shelter.entity';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  last_name: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;

  @Column()
  birthdate: Date;

  @Column({
    type: 'bigint',
    nullable: true,
  })
  phone?: number | undefined;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  location?: string | undefined;

  @Column({
    nullable: true,
    default: true,
  })
  isActive: boolean;

  @Column({
    nullable: true,
    default: 'user',
  })
  role?: string;

  // @OneToMany(() => DonationEntity, (donation) => donation.user)
  // donations: DonationEntity[];

  @ManyToMany(() => ShelterEntity, (favorite) => favorite.user)
  @JoinTable()
  favorite: ShelterEntity[];

  @OneToMany(() => AdoptionEntity, (adoptions) => adoptions.user)
  adoptions: AdoptionEntity[];

  @OneToMany(() => OrdersEntity, (orders) => orders.user)
  @JoinColumn({ name: 'order_id' })
  orders: OrdersEntity[];
}
