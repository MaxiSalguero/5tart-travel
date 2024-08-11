import { Module } from '@nestjs/common';
import { AgencyController } from './agency.controller';
import { AgencyServices } from './agency.service';
import { AgencyEntity } from 'src/entities/agency.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyRepository } from './agency.repository';
import { TourEntity } from 'src/entities/tour.entity';
import { AgencyGateway } from './agency.gateway';
import { UserRepository } from 'src/user/user.repository';
import { UserEntity } from 'src/entities/user.entity';
import { MapsService } from 'src/maps/maps.service';

@Module({
  imports: [TypeOrmModule.forFeature([AgencyEntity, TourEntity, UserEntity])],
  controllers: [AgencyController],
  providers: [
    AgencyServices,
    AgencyRepository,
    AgencyGateway,
    UserRepository,
    MapsService,
  ],
})
export class AgencyModule {}
