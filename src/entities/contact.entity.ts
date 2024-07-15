import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
    name: 'contact',
})
export class ContactEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

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
        nullable: true
    })
    mail?: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    telefono?: string;

    @Column({
        default: new Date(),
      })
      date: Date;

}
