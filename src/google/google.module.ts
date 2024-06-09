import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './google.strategy';

@Module({
  controllers: [GoogleController],
  providers: [GoogleStrategy]
})
export class GoogleModule {}
