import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
    name: 'comment',
})
export class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({
        type: 'varchar',
    })
    username: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    good?: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    bad?: string;

    @Column({
        nullable: true
    })
    rate?: number;

}
