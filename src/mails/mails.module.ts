import { Module } from "@nestjs/common";
import { mailsServices } from "./mails.service";

@Module({
    imports: [],
    controllers: [],
    providers: [mailsServices]
})
export class mailsModule { }