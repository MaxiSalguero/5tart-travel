import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from 'src/DTOS/CreateUser.dto';
import { CreateAgencyDto } from 'src/DTOS/CreateAgency.dto';
import { ApiTags } from '@nestjs/swagger';
import { FoundEmailDto } from 'src/DTOS/FoundEmail.dto';
import { ChangePasswordDto } from 'src/DTOS/ChangePassword.dto';

@ApiTags('Auth')
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

  @Post('/email')
  foundEmail(@Body() body: FoundEmailDto) {
    const { mail } = body;
    const result = this.authService.foundEmail(mail);
    return result;
  }

  @Put('/password')
  changePassword(@Body() body: ChangePasswordDto) {
    const { id, type, newPassword } = body;
    return this.authService.changePassword(id, type, newPassword);
  }
}
