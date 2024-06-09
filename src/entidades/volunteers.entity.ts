import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'volunter',
})
export class VolunteerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column({
    default: true,
  })
  status: boolean;

  @Column()
  shelter_id: string;

  @Column()
  user_id: string;
}
