import { Module } from "@nestjs/common";
import { userController } from "./user.controller";
import { UserServices } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";
import { UserRepository } from "./user.repository";


@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    controllers:[userController],
    providers:[UserServices, UserRepository]
})
export class userModule{}