import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    nullable: false,
    type: 'varchar',
  })
  username: string;

  @Column({
    nullable: false,
    type: 'varchar',
    unique: true,
  })
  mail: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  password: string;

  @Column({
    nullable: false,
  })
  birthday: Date;
}
