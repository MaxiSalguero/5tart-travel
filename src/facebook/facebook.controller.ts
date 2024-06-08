import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { FacebookService } from './facebook.service';

@Controller()
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}

  @Get('facebook')
  async facebookAuth(@Res() res: Response): Promise<void> {
    const url = this.facebookService.getFacebookAuthURL();
    res.redirect(url);
  }

  @Get('facebook/callback')
  async facebookAuthCallback(@Query('code') code: string, @Res() res: Response): Promise<void> {
    try {
      const tokens = await this.facebookService.handleFacebookCallback(code);
      // Maneja la autenticación del usuario en tu aplicación aquí
      // Podrías crear una sesión, enviar un JWT, etc.
      res.json(tokens);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}