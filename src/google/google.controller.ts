import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class GoogleController {
  constructor() {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginRedirect(@Req() req: Request): Promise<any> {
    const { user } = <any>req;

    return {
      statusCode: HttpStatus.OK,
      data: user,
    };

    // return { url: `${this.FRONT_URL}` }
  }
}
