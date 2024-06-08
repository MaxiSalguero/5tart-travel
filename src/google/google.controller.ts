import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GoogleService } from './google.service';

@Controller()
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('google')
  async googleAuth(@Res() res: Response): Promise<void> {
    const url = this.googleService.getGoogleAuthURL();
    res.redirect(url);
  }

  @Get('google/callback')
  async googleAuthCallback(@Query('code') code: string, @Res() res: Response): Promise<void> {
    try {
      const tokens = await this.googleService.handleGoogleCallback(code);
      // Maneja la autenticación del usuario en tu aplicación aquí
      // Podrías crear una sesión, enviar un JWT, etc.
      res.json(tokens);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
