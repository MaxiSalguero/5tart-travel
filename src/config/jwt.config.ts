import { JwtModuleOptions } from '@nestjs/jwt';
import { configDotenv } from 'dotenv';

configDotenv({ path: '.development.env' });

export const jwtConfig: JwtModuleOptions = {
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: '1h',
  },
};