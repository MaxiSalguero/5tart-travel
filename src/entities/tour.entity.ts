import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"


@Entity({
    name:'tour'
})
export class TourEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string = uuid()

    @Column()
    title: string

    @Column()
    price: number

    @Column()
    description: string

    @Column()
    fecha_ingreso: Date

    @Column()
    fecha_egreso: Date

    @Column()
    country: string

    @Column()
    region: string

    @Column()
    state: string

    @Column({
        default: new Date
    })
    date: Date
}