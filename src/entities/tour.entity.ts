import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { AgencyEntity } from './agency.entity';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';

export class TuristPoints {
  nombre: string;
  lat: number;
  lon: number;
  price:number;
}

@Entity({
  name: 'tour',
})
export class TourEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column({
    nullable: true,
    type: 'text',
    default:
      'https://res.cloudinary.com/dia2gautk/image/upload/v1719807466/logo_start_hy9j22.webp',
  })
  imgUrl?: string;

  @Column()
  fecha_ingreso: Date;

  @Column()
  fecha_egreso: Date;

  @Column({ nullable: true, type: 'float' })
  lat?: number;

  @Column({ nullable: true, type: 'float' })
  lon?: number;

  @Column({ nullable: true })
  display_name?: string;

  @Column()
  destino: string;

  @Column()
  salida: string;

  @Column()
  address: string;

  @Column({
    nullable: true,
  })
  country: string;

  @Column({
    nullable: true,
  })
  region: string;

  @Column({
    nullable: true,
  })
  state: string;

  @Column({
    default: new Date(),
  })
  date: Date;

  @Column()
  transportType: string;

  @Column({
    default: false,
  })
  oferta: boolean;

  @Column({
    nullable: true,
  })
  hotel?: string;

  @Column({
    nullable: true,
    type: 'text',
    array: true,
  })
  listImg?: string[];

  @Column({
    nullable: true,
  })
  empresa?: string;

  @Column({ type: 'float', nullable: true }) // Define averageRate here
  averageRate?: number;

  @Column('jsonb', { nullable: true })
  touristPoints?: TuristPoints[];

  @ManyToOne(() => AgencyEntity, (agency) => agency.tours)
  @JoinColumn()
  agency: AgencyEntity;

  @ManyToMany(() => UserEntity, (user) => user.favorite_tours)
  user: UserEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.tour, { cascade: true })
  comments: CommentEntity[];
}
