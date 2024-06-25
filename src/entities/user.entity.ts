import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'users'
})
export class userEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string
}