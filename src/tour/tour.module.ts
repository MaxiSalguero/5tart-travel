import { Module } from "@nestjs/common";
import { tourController } from "./tour.controller";
import { tourService } from "./tour.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TourEntity } from "src/entities/tour.entity";

@Module({
    imports:[TypeOrmModule.forFeature([TourEntity])],
    controllers: [tourController],
    providers: [tourService]
})
export class tourModule { }