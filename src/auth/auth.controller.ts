import { Body, Controller, Post } from '@nestjs/common';
import { UserServices } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/DTOS/CreateUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('user')
    createUser(@Body() user: CreateUserDto){
        return this.authService.createUser(user)
    }
}
