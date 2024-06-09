import { Module } from '@nestjs/common';
import { FacebookController } from './facebook.controller';
import { FacebookStrategy } from './facebook.strategy';

@Module({
  controllers: [FacebookController],
  providers: [FacebookStrategy]
})
export class FacebookModule {}