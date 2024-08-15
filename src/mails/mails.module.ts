import { Module } from '@nestjs/common';
import { MailsServices } from './mails.service';
import { ConfigService } from '@nestjs/config';
import { PdfService } from './generatePdf.service';

@Module({
  providers: [MailsServices, ConfigService,PdfService],
})
export class MailsModule {}
