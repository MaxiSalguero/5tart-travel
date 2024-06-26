import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"


@Entity({
    name: 'users'
})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({
        nullable: false
    })
    username: string
    
    @Column({
        nullable: false
    })
    mail: string

    @Column({
        nullable: false
    })
    password: string

    @Column({
        nullable: false
    })
    confirm_password: string

    @Column({
        nullable: false
    })
    birthday: string


}