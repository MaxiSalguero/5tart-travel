import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgencyEntity } from './entities/agency.entity';
import { TourEntity } from './entities/tour.entity';
import * as data from './helpers/data.json'
import * as dataAgency from './helpers/dataAgency.json'
import { MapsService } from './maps/maps.service';



@Injectable()
export class PreloadService implements OnModuleInit {
    constructor(
        @InjectRepository(AgencyEntity)
        private readonly agencyRepository: Repository<AgencyEntity>,
        @InjectRepository(TourEntity)
        private readonly tourRepository: Repository<TourEntity>,
        private readonly mapsservice: MapsService
    ) { }

    async onModuleInit() {
        await this.loadShelters();
        await this.loadTours();
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

        return "Refugios cargados";
    }

    async loadTours() {
        for (const tour of data) {
            const agency = await this.agencyRepository.findOne({
                where: { name_agency: tour.agency }
            });
            const geocodeData = await this.mapsservice.geocodeAddress(tour.address)
            if (agency) {
                const existingTour = await this.tourRepository.findOne({
                    where: {
                        title: tour.title,
                        price: tour.price,
                        description: tour.description,
                        address: tour.address,
                        imgUrl: tour.imgUrl,
                        country: geocodeData.country,
                        region: geocodeData.region,
                        state: geocodeData.state,
                        agency: agency
                    },
                });

                if (!existingTour) {
                    await this.tourRepository.save({ ...tour, agency: agency,country:geocodeData.country,region: geocodeData.region,
                        state: geocodeData.state });
                }
            }
        }

        return "Publicaciones cargadas";
    }
}
