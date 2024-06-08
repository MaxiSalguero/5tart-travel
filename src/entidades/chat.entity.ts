import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"


@Entity({
    name: 'chat'
})

export class ChatEntity{

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()


    @Column({
        nullable: false,
    })
    date: Date


    @Column()
    user_id: string
    

    @Column()
    shelter_id: string
}