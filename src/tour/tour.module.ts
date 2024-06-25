import { Module } from "@nestjs/common";
import { tourController } from "./tour.controller";
import { tourService } from "./tour.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { tourEntity } from "src/entities/tour.entity";

@Module({
    imports:[TypeOrmModule.forFeature([tourEntity])],
    controllers: [tourController],
    providers: [tourService]
})
export class tourModule { }