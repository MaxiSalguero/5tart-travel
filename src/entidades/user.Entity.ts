import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
// import { DonationEntity } from './donation.entity';
import { AdoptionEntity } from './adoption.entity';
import { OrdersEntity } from './orders.entity';
import { ShelterEntity } from './shelter.entity';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

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
    nullable: false,
  })
  email: string;

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

  // @OneToMany(() => DonationEntity, (donation) => donation.user)
  // donations: DonationEntity[];


  @ManyToMany(() => ShelterEntity, (favorite) => favorite.user)
  @JoinTable()
  favorite: ShelterEntity[];

  @OneToMany(() => AdoptionEntity, (adoptions) => adoptions.user)
  adoptions: AdoptionEntity[];

  @OneToMany(() => OrdersEntity, (orders) => orders.user)
    @JoinColumn({ name: "order_id" })
    orders: OrdersEntity[]
}
