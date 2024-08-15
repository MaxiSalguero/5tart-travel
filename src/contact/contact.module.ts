import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ContactRepository } from './contact.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from 'src/entities/contact.entity';
import { MailsServices } from 'src/mails/mails.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { PdfService } from 'src/mails/generatePdf.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity])],
  controllers: [ContactController],
  providers: [
    ContactService,
    PdfService,
    ContactRepository,
    MailsServices,
    ConfigService,
    AuthGuard,
    RolesGuard,
  ],
})
export class ContactModule {}
