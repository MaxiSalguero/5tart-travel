import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'contact',
})
export class ContactEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  username: string;

  @Column({
    type: 'varchar',
  })
  message: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  mail?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  telefono?: string;

  @Column({
    default: new Date(),
  })
  date: Date;
}
