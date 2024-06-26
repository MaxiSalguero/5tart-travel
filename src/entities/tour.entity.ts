import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"


@Entity({
    name:'tour'
})
export class TourEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string = uuid()

    @Column()
    name:string

    @Column({
        default: new Date
    })
    date: Date
}