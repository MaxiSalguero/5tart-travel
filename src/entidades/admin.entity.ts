import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'admin',
})
export class AdminEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

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
  })
  password: string;
}
