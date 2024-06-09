// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import {v4 as uuid} from "uuid"
// import { UserEntity } from "./user.entity";
// import { ShelterEntity } from "./shelter.entity";

// @Entity({
//     name:'donation'
// })
// export class DonationEntity{

//     @PrimaryGeneratedColumn("uuid")
//     id: string = uuid()

//     @Column({
//         type: "decimal",
//         precision: 10,
//         scale: 2,
//         nullable: false
//     })
//     amount: number

//     @Column({
//         nullable: true,
//     })
//     date: Date

//     @ManyToOne(() => ShelterEntity, shelter => shelter.donations)
//     shelter: ShelterEntity;

//     @ManyToOne(() => UserEntity, user => user.donations)
//     user: UserEntity;

// }
