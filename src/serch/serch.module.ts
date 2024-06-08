import { Module } from '@nestjs/common';
import { SerchService } from './serch.service';
import { SearchController } from './serch.controller';
import { PetsRepository } from 'src/pets/pets.repository';
import { ShelterRepository } from 'src/shelters/shelters.repository';
import { ShelterEntity } from 'src/entidades/shelter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsEntity } from 'src/entidades/pets.entity';
import { MailModule } from 'src/mails/mail.module';
import { SearchRepository } from './serch.repository';

@Module({
  imports:[TypeOrmModule.forFeature([ShelterEntity, PetsEntity]), MailModule],
  providers: [SerchService, PetsRepository, ShelterRepository, SearchRepository],
  controllers: [SearchController]
})
export class SerchModule {}
