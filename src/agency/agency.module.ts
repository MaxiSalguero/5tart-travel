import { Module } from "@nestjs/common";
import { agencyController } from "./agency.controller";
import { AgencyServices } from "./agency.service";
import { AgencyEntity } from "src/entities/agency.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AgencyRepository } from "./agency.repository";

@Module({
    imports:[TypeOrmModule.forFeature([AgencyEntity])],
    controllers: [agencyController],
    providers: [AgencyServices, AgencyRepository]
})
export class agencyModule {}