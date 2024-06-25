import { Module } from "@nestjs/common";
import { tourController } from "./tour.controller";
import { tourService } from "./tour.service";

@Module({
    imports: [],
    controllers: [tourController],
    providers: [tourService]
})
export class tourModule { }