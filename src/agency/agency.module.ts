import { Module } from "@nestjs/common";
import { agencyController } from "./agency.controller";
import { agencyServices } from "./agency.service";
import { agencyEntity } from "src/entities/agency.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports:[TypeOrmModule.forFeature([agencyEntity])],
    controllers: [agencyController],
    providers: [agencyServices]
})
export class agencyModule { }