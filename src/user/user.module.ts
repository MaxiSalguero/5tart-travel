import { Module } from '@nestjs/common';
import { userController } from './user.controller';
import { UserServices } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';
import { AuthService } from 'src/auth/auth.service';
import { AgencyRepository } from 'src/agency/agency.repository';
import { AgencyEntity } from 'src/entities/agency.entity';
import { mailsServices } from 'src/mails/mails.service';
import { ConfigService } from '@nestjs/config';
import { TourEntity } from 'src/entities/tour.entity';
import { AgencyGateway } from 'src/agency/agency.gateway';
import { MapsService } from 'src/maps/maps.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AgencyEntity, TourEntity])],
  controllers: [userController],
  providers: [
    UserServices,
    UserRepository,
    AuthService,
    AgencyRepository,
    mailsServices,
    ConfigService,
    AgencyGateway,
    MapsService
  ],
})
export class userModule {}
