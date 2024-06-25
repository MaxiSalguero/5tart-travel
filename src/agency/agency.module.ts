import { Module } from "@nestjs/common";
import { agencyController } from "./agency.controller";
import { agencyServices } from "./agency.service";

@Module({
    imports: [],
    controllers: [agencyController],
    providers: [agencyServices]
})
export class agencyModule { }