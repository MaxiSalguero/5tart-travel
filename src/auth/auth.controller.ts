import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from 'src/DTOS/CreateUser.dto';
import { CreateAgencyDto } from 'src/DTOS/CreateAgency.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register/user')
  createUser(@Body() user: CreateUserDto) {
    return this.authService.createUser(user);
  }

  @Post('register/agency')
  createAgency(@Body() agency: CreateAgencyDto) {
    return this.authService.createAgency(agency);
  }

  @Post('login')
  login(@Body() log: LoginDto) {
    const { mail, password } = log;
    return this.authService.login(mail, password);
  }
}
