import { Module } from "@nestjs/common";
import { userController } from "./user.controller";
import { userServices } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userEntity } from "src/entities/user.entity";


@Module({
    imports:[TypeOrmModule.forFeature([userEntity])],
    controllers:[userController],
    providers:[userServices]
})
export class userModule{}