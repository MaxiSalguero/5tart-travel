import { Module } from '@nestjs/common';
import { tourController } from './tour.controller';
import { TourService } from './tour.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourEntity } from 'src/entities/tour.entity';
import { TourRepository } from './tour.repository';
import { MapsService } from 'src/maps/maps.service';
import { AgencyEntity } from 'src/entities/agency.entity';
import { mailsServices } from 'src/mails/mails.service';
import { ConfigService } from '@nestjs/config';
import { CommentEntity } from 'src/entities/comment.entity';
import { AgencyGateway } from 'src/agency/agency.gateway';
import { AgencyRepository } from 'src/agency/agency.repository';
import { UserRepository } from 'src/user/user.repository';
import { UserEntity } from 'src/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TourEntity, AgencyEntity, CommentEntity, UserEntity])],
  controllers: [tourController],
  providers: [
    TourService,
    TourRepository,
    MapsService,
    mailsServices,
    ConfigService,
    AgencyGateway,
    AgencyRepository,
    UserRepository
  ],
})
export class tourModule {}
