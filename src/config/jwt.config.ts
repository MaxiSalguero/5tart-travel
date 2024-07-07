import { JwtModuleOptions } from '@nestjs/jwt';
import { JWT_SECRET } from './envs';

export const jwtConfig: JwtModuleOptions = {
  global: true,
  secret: JWT_SECRET,
  signOptions: {
    expiresIn: '24h',
  },
};
