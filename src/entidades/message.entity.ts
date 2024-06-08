import { text } from "stream/consumers";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'message'
})

export class MessageEntity {
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column({type: 'text'})
    content : string

    @Column()
    createdAt : Date
}