import { Module } from "@nestjs/common";
import { userController } from "./user.controller";
import { userServices } from "./user.service";


@Module({
    imports:[],
    controllers:[userController],
    providers:[userServices]
})
export class userModule{}