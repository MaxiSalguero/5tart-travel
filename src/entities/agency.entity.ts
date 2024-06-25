import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'agency'
})

export class agencyEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string
}