import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ContactRepository } from './contact.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from 'src/entities/contact.entity';
import { mailsServices } from 'src/mails/mails.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity])],
  controllers: [ContactController],
  providers: [ContactService, ContactRepository,mailsServices,ConfigService]
})
export class ContactModule {}
