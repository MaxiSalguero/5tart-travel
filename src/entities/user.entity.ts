import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { TourEntity } from './tour.entity';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

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

  @Column({nullable:true})
  birthday: Date;

  @ManyToMany(() => TourEntity, (favorite_tours) => favorite_tours.user)
  @JoinTable()
  favorite_tours: TourEntity[];

}
