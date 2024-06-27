import { Module } from "@nestjs/common";
import { tourController } from "./tour.controller";
import { TourService } from "./tour.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TourEntity } from "src/entities/tour.entity";
import { TourRepository } from "./tour.repository";
import { MapsService } from "src/maps/maps.service";
import { AgencyEntity } from "src/entities/agency.entity";

@Module({
    imports:[TypeOrmModule.forFeature([TourEntity, AgencyEntity])],
    controllers: [tourController],
    providers: [TourService, TourRepository,MapsService]
})
export class tourModule { }