import { Controller, Get } from "@nestjs/common";
import { UserServices } from "./user.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@Controller('user')
export class userController {
    constructor(private userService: UserServices){}

    @Get()
    getUsers(){
        return this.userService.getUsers()
    }

}