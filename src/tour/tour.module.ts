import { Module } from '@nestjs/common';
import { TourController } from './tour.controller';
import { TourService } from './tour.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourEntity } from 'src/entities/tour.entity';
import { TourRepository } from './tour.repository';
import { MapsService } from 'src/maps/maps.service';
import { AgencyEntity } from 'src/entities/agency.entity';
import { MailsServices } from 'src/mails/mails.service';
import { ConfigService } from '@nestjs/config';
import { CommentEntity } from 'src/entities/comment.entity';
import { AgencyGateway } from 'src/agency/agency.gateway';
import { AgencyRepository } from 'src/agency/agency.repository';
import { UserRepository } from 'src/user/user.repository';
import { UserEntity } from 'src/entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { GlobalGuard } from 'src/guards/global.guard';
import { PdfService } from 'src/mails/generatePdf.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TourEntity,
      AgencyEntity,
      CommentEntity,
      UserEntity,
    ]),
  ],
  controllers: [TourController],
  providers: [
    TourService,
    TourRepository,
    MapsService,
    MailsServices,
    ConfigService,
    AgencyGateway,
    AgencyRepository,
    UserRepository,
    AuthGuard,
    RolesGuard,
    PdfService
  ],
})
export class TourModule {}
