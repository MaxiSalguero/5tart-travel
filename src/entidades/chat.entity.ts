import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'chat',
})
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  user_id: string;

  @Column()
  shelter_id: string;
}
