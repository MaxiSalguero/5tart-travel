import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserServices } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';
import { AuthService } from 'src/auth/auth.service';
import { AgencyRepository } from 'src/agency/agency.repository';
import { AgencyEntity } from 'src/entities/agency.entity';
import { MailsServices } from 'src/mails/mails.service';
import { ConfigService } from '@nestjs/config';
import { TourEntity } from 'src/entities/tour.entity';
import { AgencyGateway } from 'src/agency/agency.gateway';
import { MapsService } from 'src/maps/maps.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { GlobalGuard } from 'src/guards/global.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AgencyEntity, TourEntity])],
  controllers: [UserController],
  providers: [
    UserServices,
    UserRepository,
    AuthService,
    AgencyRepository,
    MailsServices,
    ConfigService,
    AgencyGateway,
    MapsService,
    AuthGuard,
    RolesGuard,
  ],
})
export class UserModule {}
