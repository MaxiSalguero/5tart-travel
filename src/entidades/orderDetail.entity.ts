import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { ShelterEntity } from "./shelter.entity";
import { OrdersEntity } from "./orders.entity";

@Entity({
    name: "orderdetails"
})
export class OrderDetailsEntity {
    
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: false
    })
    totalPrice: number
    
    @ManyToMany(() => ShelterEntity, (shelters) => shelters.orderDetail)
    @JoinTable({
        name: "orderdetails_shelters",
        joinColumn:{
            name: "shelters_id",
            referencedColumnName:"id"
        }, 
        inverseJoinColumn:{
            name: "orderdetail_id",
            referencedColumnName: "id",
        }
    })
    shelters: ShelterEntity[];

    @OneToOne(() => OrdersEntity)
    @JoinColumn({name: "order_id"})
    order: OrdersEntity
}