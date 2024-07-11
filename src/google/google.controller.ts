import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AgencyEntity } from 'src/entities/agency.entity';
import { GoogleService } from './google.service';
import { FRONT_URL } from 'src/config/envs';

@Controller()
export class GoogleController {
  private readonly FRONT_URL = process.env.FRONT_URL;

  constructor(
    private readonly googleService: GoogleService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(AgencyEntity)
    private readonly agencyRepository: Repository<AgencyEntity>,
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
    const redirectBaseUrl = `${FRONT_URL}/AUTH`;

    const existingUser = await this.userRepository.findOne({
      where: { mail: user.email },
    });
    const existingAgency = await this.agencyRepository.findOne({
      where: { mail: user.email },
    });

    if (existingAgency) {
      return res.redirect(`${redirectBaseUrl}/errorGoogle`);
    }

    if (!existingUser) {
      return this.googleService.handleNewUser(user, res);
    }

    const isPasswordValid = await bcrypt.compare(
      user.email,
      existingUser.password,
    );
    if (isPasswordValid) {
      return this.googleService.handleExistingUser(user.email, res);
    } else {
      return res.redirect(`${redirectBaseUrl}/errorUserRegister`);
    }
  }
}
