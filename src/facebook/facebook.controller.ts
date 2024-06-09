import {
  Controller,
  Get,
  HttpStatus,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller()
export class FacebookController {
  private readonly FRONT_URL = process.env.FRONT_URL

  constructor() {}

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {}

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    const { user } = <any>req;

    //Obtengo los datos y guardo en mi BD

    return {
      statusCode: HttpStatus.OK,
      data: user,
    };

    // return { url: `${this.FRONT_URL}` }
  }
}
