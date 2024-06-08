import { Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid"


export class PromotionsEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({
        type: 'varchar',
        nullable: false,
    })
    title: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    description: string;

}