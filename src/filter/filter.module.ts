import { Module } from "@nestjs/common";
import { filterController } from "./filter.controller";
import { FilterService } from "./filter.Service";

@Module({
    imports: [],
    controllers: [filterController],
    providers: [FilterService]
})
export class filterModule { }