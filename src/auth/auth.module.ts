import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AgencyEntity } from 'src/entities/agency.entity';
import { mailsServices } from 'src/mails/mails.service';
import { ConfigService } from '@nestjs/config';
import { AgencyGateway } from 'src/agency/agency.gateway';
import { AgencyRepository } from 'src/agency/agency.repository';
import { TourEntity } from 'src/entities/tour.entity';
import { UserRepository } from 'src/user/user.repository';
import { MapsService } from 'src/maps/maps.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AgencyEntity, TourEntity])],
  providers: [AuthService, mailsServices, ConfigService, AgencyGateway, AgencyRepository, UserRepository, MapsService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
