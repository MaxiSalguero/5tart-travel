import { Module } from "@nestjs/common";
import { userController } from "./user.controller";
import { UserServices } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";
import { UserRepository } from "./user.repository";
import { AuthService } from "src/auth/auth.service";
import { AgencyRepository } from "src/agency/agency.repository";
import { AgencyEntity } from "src/entities/agency.entity";


@Module({
    imports:[TypeOrmModule.forFeature([UserEntity, AgencyEntity])],
    controllers:[userController],
    providers:[UserServices, UserRepository, AuthService, AgencyRepository]
})
export class userModule{}