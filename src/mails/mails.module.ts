import { Module } from '@nestjs/common';
import { MailsServices } from './mails.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [MailsServices, ConfigService],
})
export class MailsModule {}
