import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid"
import { TourEntity } from "./tour.entity";

@Entity({
    name: 'agency'
})
export class AgencyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column()
    name_agency: string

    @Column()
    mail: string

    @Column()
    password: string

    @Column()
    confirm_password: string

    @Column()
    address: string

    @Column()
    imgUrl: string

    @OneToMany(() => TourEntity, (tours) => tours.agency)
    @JoinColumn()
    tours: TourEntity[];

}