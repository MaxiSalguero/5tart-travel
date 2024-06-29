import { Module } from "@nestjs/common";
import { mailsServices } from "./mails.service";
import { ConfigService } from "@nestjs/config";
import { TourRepository } from "src/tour/tour.repository";



@Module({
    imports: [],
    controllers: [],
    providers: [mailsServices,ConfigService]
})
export class mailsModule { }