import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid"
import { AgencyEntity } from "./agency.entity";
import { TransportType } from "./transporte.enum";


@Entity({
    name: 'tour'
})
export class TourEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column()
    title: string

    @Column()
    price: number

    @Column()
    description: string

    @Column()
    imgUrl: string

    @Column()
    fecha_ingreso: Date

    @Column()
    fecha_egreso: Date

    @Column()
    destino: string

    @Column()
    salida: string

    @Column()
    address: string

    @Column({
        nullable: true
    })
    country: string

    @Column({
        nullable: true
    })
    region: string

    @Column({
        nullable: true
    })
    state: string

    @Column({
        default: new Date
    })
    date: Date

    @Column()
    transportType: string;

    @Column({
        default: false
    })
    oferta: boolean;


    @ManyToOne(() => AgencyEntity, (agency) => agency.tours)
    @JoinColumn()
    agency: AgencyEntity


}