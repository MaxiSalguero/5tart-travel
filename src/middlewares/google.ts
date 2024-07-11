import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FRONT_URL } from 'src/config/envs';

@Injectable()
export class GoogleAuthErrorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { error } = req.query;

    if (error) {
      return res.redirect(`${FRONT_URL}/AUTH/login`);
    }

    next();
  }
}
