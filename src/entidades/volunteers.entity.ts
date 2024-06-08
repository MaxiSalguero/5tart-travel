import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid"


@Entity({
    name: 'volunteer'
})
export class VolunteerEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()


    @Column({
        nullable: false,
    })
    date: Date


    @Column({
        nullable: false,
        default: true
    })
    status: boolean


    @Column()
    shelter_id: string


    @Column()
    user_id: string
}