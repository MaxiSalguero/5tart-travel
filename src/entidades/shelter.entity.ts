import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { DonationEntity } from './donation.entity';
import { AdoptionEntity } from './adoption.entity';
import { PetsEntity } from './pets.entity';
import { OrderDetailsEntity } from './orderDetail.entity';
import { UserEntity } from './users.entity';

@Entity({
  name: 'shelter',
})
export class ShelterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

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

  @Column({
    type: 'int',
    unique: true,
  })
  dni: number;

  @Column({
    type: 'bigint',
    nullable: true,
  })
  phone?: number;

  @Column({
    type: 'varchar',
  })
  shelter_name: string;

  @Column({
    type: 'varchar',
  })
  location: string;

  @Column({
    type: 'varchar',
  })
  zona: string;

  @Column({
    type: 'varchar',
  })
  description: string;

  @Column({
    type: 'text',
    default:
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png',
  })
  imgUrl: string;

  @Column({
    nullable: true,
    default: false,
  })
  exotic_animals: boolean;

  @Column({
    nullable: true,
    default: false,
  })
  isActive: boolean;

  @Column({
    nullable: true,
    type: 'decimal',
  })
  rate: number;

  @Column({
    nullable: true,
    default: 'user',
  })
  role?: string;

  @ManyToMany(() => UserEntity, (user) => user.favorite_shelters)
  user: UserEntity[];

  @ManyToMany(() => AdoptionEntity, (adoptions) => adoptions.shelter)
  adoptions: AdoptionEntity[];

  @OneToMany(() => PetsEntity, (pets) => pets.shelter)
  @JoinColumn()
  pets: PetsEntity[];

  @ManyToMany(() => OrderDetailsEntity, (orderdetail) => orderdetail.shelters)
  orderDetail: OrderDetailsEntity[];
}
