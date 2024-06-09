import { JwtModuleOptions } from '@nestjs/jwt';
import { configDotenv } from 'dotenv';

configDotenv({ path: '.env' });

export const jwtConfig: JwtModuleOptions = {
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: '1h',
  },
};