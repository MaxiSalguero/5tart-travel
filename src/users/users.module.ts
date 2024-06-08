import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './User.Repository';
import { UserEntity } from '../entidades/user.entity';
import { VolunteerEntity } from '../entidades/volunteers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from 'src/mails/mail.service';
import { ConfigService } from '@nestjs/config';
import { ShelterEntity } from 'src/entidades/shelter.entity';
import { ShelterRepository } from 'src/shelters/shelters.repository';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,VolunteerEntity,ShelterEntity])],
  controllers: [UserController],
  providers: [UserService,UserRepository,MailService, ConfigService, ShelterRepository]
})
export class UsersModule {}
