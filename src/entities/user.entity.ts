import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'user'
})
export class userEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string
}