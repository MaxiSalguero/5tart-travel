import { Module } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { AdoptionController } from './adoption.controller';
import { AdoptionRepository } from './adoption.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdoptionEntity } from '../entidades/adoption.entity';
import { ShelterEntity } from 'src/entidades/shelter.entity';
import { UserEntity } from 'src/entidades/user.entity';
import { PetsEntity } from 'src/entidades/pets.entity';
import { PetsService } from 'src/pets/pets.service';
import { PetsRepository } from 'src/pets/pets.repository';

@Module({
  imports:[TypeOrmModule.forFeature([AdoptionEntity, ShelterEntity, UserEntity, PetsEntity])],
  providers: [AdoptionService,AdoptionRepository,PetsService, PetsRepository],
  controllers: [AdoptionController],
})
export class AdoptionModule {}
