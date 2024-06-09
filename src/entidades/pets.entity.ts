import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShelterEntity } from './shelter.entity';

@Entity({
  name: 'pet',
})
export class PetsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: 'Sin nombre',
  })
  name?: string;

  @Column({
    type: 'varchar',
  })
  sexo: string;

  @Column({
    type: 'varchar',
  })
  breed: string;

  @Column()
  age: number;

  @Column()
  month: number;

  @Column({
    type: 'varchar',
    nullable: true,
    default: '',
  })
  description?: string;

  @Column({
    type: 'varchar',
  })
  pet_size: string;

  @Column({
    type: 'text',
    default:
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png',
  })
  imgUrl: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  godfather?: string | undefined;

  @Column({
    nullable: true,
    default: false,
  })
  isCondition: boolean;

  @Column({
    nullable: true,
    default: true,
  })
  isActive: boolean;

  @ManyToOne(() => ShelterEntity, (shelter) => shelter.pets)
  shelter: ShelterEntity;
}
