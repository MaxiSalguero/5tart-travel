import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { LoginDto } from 'src/dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth0Guard } from '../guards/auth0.guard';
import { CreateShelterDto } from 'src/dto/createShelter.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(Auth0Guard)
  @Post('/register/user')
  Register(@Body() register: CreateUserDto, @Req() req) {
    const accessToken = req.auth0Token;
    const { email, password, confirm_password, ...metadata } = register;
    return this.authService.RegisterUser(
      email,
      password,
      metadata,
      accessToken,
    );
  }

  @UseGuards(Auth0Guard)
  @Post('/register/shelter')
  registerShelter(@Body() register: CreateShelterDto, @Req() req) {
    const accessToken = req.auth0Token;
    const { email, password, ...metadata } = register;
    
    return this.authService.RegisterShelter(
      email,
      password,
      metadata,
      accessToken,
    );
  }

  @Post('login')
  Login(@Body() credential: LoginDto) {
    const { email, password } = credential;
    return this.authService.Login(email, password);
  }
}
