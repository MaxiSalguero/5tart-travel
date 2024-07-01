import { Module } from '@nestjs/common';
import { mailsServices } from './mails.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [],
  providers: [mailsServices, ConfigService],
})
export class mailsModule {}
