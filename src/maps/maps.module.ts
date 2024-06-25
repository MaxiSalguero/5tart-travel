import { Module } from "@nestjs/common";
import { mapsServices } from "./maps.service";

@Module({
    imports: [],
    controllers: [],
    providers: [mapsServices]
})
export class mapsModule { }