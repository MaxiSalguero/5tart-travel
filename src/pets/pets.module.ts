import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { PetsRepository } from './pets.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsEntity } from '../entidades/pets.entity';
import { ShelterEntity } from 'src/entidades/shelter.entity';
import { MailService } from 'src/mails/mail.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([PetsEntity,ShelterEntity])],
  controllers: [PetsController],
  providers: [PetsService , PetsRepository, MailService, ConfigService, JwtService]
})
export class PetsModule {}
