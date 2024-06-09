import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { LoginDto } from 'src/dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateShelterDto } from 'src/dto/createShelter.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register/user')
  registerUser(@Body() register: CreateUserDto, @Req() req) {
    return this.authService.registerUser(register);
  }

  @Post('/register/shelter')
  registerShelter(@Body() register: CreateShelterDto, @Req() req) {
    return this.authService.registerShelter(register);
  }

  @Post('login/user')
  loginUser(@Body() credential: LoginDto) {
    const { email, password } = credential;
    return this.authService.loginUser(email, password);
  }

  @Post('login/shelter')
  loginShelter(@Body() credential: LoginDto) {
    const { email, password } = credential;
    return this.authService.loginShelter(email, password);
  }
}
