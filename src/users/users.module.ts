import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './users.repository';
import { UserEntity } from '../entidades/users.entity';
import { VolunteerEntity } from '../entidades/volunteers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from 'src/mails/mail.service';
import { ConfigService } from '@nestjs/config';
import { ShelterEntity } from 'src/entidades/shelter.entity';
import { PetsEntity } from 'src/entidades/pets.entity';
import { SheltersService } from 'src/shelters/shelters.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,VolunteerEntity,ShelterEntity,PetsEntity])],
  controllers: [UserController],
  providers: [UserService,UserRepository,MailService, ConfigService, SheltersService]
})
export class UsersModule {}
