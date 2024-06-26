import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/DTOS/CreateUser.dto';
import { CreateAgencyDto } from 'src/DTOS/CreateAgency.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('user')
    createUser(@Body() user: CreateUserDto){
        return this.authService.createUser(user)
    }

    @Post('agency')
    createAgency(@Body() agency: CreateAgencyDto){
        return this.authService.createAgency(agency)
    }
}
