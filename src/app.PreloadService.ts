import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Connection, DataSource, Repository } from 'typeorm';
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
    await this.loadShelters();
    await this.loadTours();
  }

  private async installUnaccentExtension() {
    try {
      await this.dataSource.query(`CREATE EXTENSION IF NOT EXISTS unaccent;`);
      console.log('Extension unaccent installed or already exists.');
    } catch (error) {
      console.error('Failed to install unaccent extension:', error);
    }
  }

  async loadShelters() {
    for (const agency of dataAgency) {
      const existingShelter = await this.agencyRepository.findOne({
        where: {
          name_agency: agency.name_agency,
          mail: agency.mail,
          password: agency.password,
          address: agency.address,
          imgUrl: agency.imgUrl,
        },
      });

      if (!existingShelter) {
        await this.agencyRepository.save(agency);
      }
    }

    return 'Refugios cargados';
  }

  async loadTours() {
    for (const tour of data) {
      const agency = await this.agencyRepository.findOne({
        where: { name_agency: tour.agency },
      });
      const geocodeData = await this.mapsservice.geocodeAddress(tour.address);
      if (agency) {
        const existingTour = await this.tourRepository.findOne({
          where: {
            title: tour.title,
            price: tour.price,
            description: tour.description,
            address: tour.address,
            imgUrl: tour.imgUrl,
            lat: geocodeData.lat,
            lon: geocodeData.lon,
            display_name: `El ${tour.hotel} -Ubicado en: ${tour.address}`,
            country: geocodeData.country,
            region: geocodeData.region,
            state: geocodeData.state,
            touristPoints: geocodeData.TuristPoints,
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
            display_name: `El ${tour.hotel} -Ubicado en: ${tour.address}`,
            touristPoints: geocodeData.touristPoints,
          });
        }
      }
    }

    return 'Publicaciones cargadas';
  }
}
