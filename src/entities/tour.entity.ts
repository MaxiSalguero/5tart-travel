import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'tour'
})
export class tourEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string
}