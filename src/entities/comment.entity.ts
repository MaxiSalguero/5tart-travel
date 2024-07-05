import { AfterInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { TourEntity } from './tour.entity';
import { TourRepository } from 'src/tour/tour.repository';
// Asegúrate de que la ruta sea correcta

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

    @ManyToOne(type => TourEntity, tour => tour.comments)
    @JoinColumn({ name: 'tourId' })
    tour: TourEntity;

}
