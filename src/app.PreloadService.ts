import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AgencyEntity } from './entities/agency.entity';
import { TourEntity } from './entities/tour.entity';
import * as data from './helpers/data.json';
import * as dataAgency from './helpers/dataAgency.json';
import { MapsService } from './maps/maps.service';

@Injectable()
export class PreloadService implements OnModuleInit {
  constructor(
    @InjectRepository(AgencyEntity)
    private readonly agencyRepository: Repository<AgencyEntity>,
    @InjectRepository(TourEntity)
    private readonly tourRepository: Repository<TourEntity>,
    private readonly mapsservice: MapsService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async onModuleInit() {
    await this.installUnaccentExtension();
    await this.loadAgencies();
    await this.loadTours();
  }

  private async installUnaccentExtension() {
    try {
      await this.dataSource.query(`Create extension if not exists unaccent;`);
    } catch (error) {
      console.error('Failed to install unaccent extension:', error);
    }
  }

  async loadAgencies() {
    for (const agency of dataAgency) {
      const existingAgency = await this.agencyRepository.findOne({
        where: {
          name_agency: agency.name_agency,
          mail: agency.mail,
          password: agency.password,
          address: agency.address,
          imgUrl: agency.imgUrl,
        },
      });

      if (!existingAgency) {
        await this.agencyRepository.save(agency);
      }
    }

    return 'Agencias cargadas correctamente';
  }

  async loadTours() {
    for (const tour of data) {
      const agency = await this.agencyRepository.findOne({
        where: { name_agency: tour.agency },
      });

      const geocodeData = await this.mapsservice.geocodeAddress(tour.address);

      const existingTour = await this.tourRepository.findOne({
        where: {
          title: tour.title,
          agency: agency,
        },
      });

      if (!existingTour) {
        await this.tourRepository.save({
          ...tour,
          agency: agency,
          country: geocodeData.country,
          region: geocodeData.region,
          state: geocodeData.state,
          lat: geocodeData.lat,
          lon: geocodeData.lon,
          display_name: `El ${tour.hotel} - Ubicado en: ${tour.address}`,
          touristPoints: geocodeData.touristPoints,
        });
      }
    }
  }
}
