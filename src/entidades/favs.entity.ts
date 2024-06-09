import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'favs',
})
export class FavsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  user_id: string;

  @Column()
  pet_id: string;
}
