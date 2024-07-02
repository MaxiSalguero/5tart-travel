import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';

@Controller()
export class GoogleController {
  private readonly FRONT_URL = process.env.FRONT_URL;

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginRedirect(@Req() req, @Res() res): Promise<any> {
    const { user } = <any>req;

    const existingUser = await this.userRepository.findOne({
      where: { mail: user.email },
    });

    if (!existingUser) {
      try {
        const hashedPassword = await bcrypt.hash(user.email, 10);

        const newUser = new UserEntity();
        newUser.username = user.firstName;
        newUser.mail = user.email;
        newUser.password = hashedPassword;

        await this.userRepository.save(newUser);
      } catch (error) {
        throw new BadRequestException('Error creando la cuenta del usuario');
      }
      try {
        const response = await this.authService.login(user.email, user.email);
        const access_token = response.token;
        const redirectUrl = `https://5tart-travel-frontend.vercel.app/AUTH/callback?access_token=${access_token}`;
        return res.redirect(redirectUrl);
      } catch (error) {
        throw new UnauthorizedException('Invalid credentials');
      }
    } else {
      try {
        const response = await this.authService.login(user.email, user.email);
        const access_token = response.token;
        const redirectUrl = `https://5tart-travel-frontend.vercel.app/AUTH/callback?access_token=${access_token}`;
        return res.redirect(redirectUrl);
      } catch (error) {
        throw new UnauthorizedException('Invalid credentials');
      }
    }
  }
}
