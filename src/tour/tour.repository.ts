import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AgencyEntity } from "src/entities/agency.entity";
import { TourEntity } from "src/entities/tour.entity";
import { MapsService } from "src/maps/maps.service";
import { Repository } from "typeorm";

@Injectable()
export class TourRepository {
    constructor(@InjectRepository(TourEntity)
    private tourRepository: Repository<TourEntity>,
        @InjectRepository(AgencyEntity)
        private agencyRepository: Repository<AgencyEntity>,
        private readonly mapsservice: MapsService) { }

    async getTours() {
        const Tours: TourEntity[] = await this.tourRepository.find({ relations: { agency: true } })

        if (Tours.length == 0) {
            return 'No hay Publicaciones registradas en la base de datos'
        }

        return Tours
    }

    async createTour(tour, userId) {

        const agency: AgencyEntity = await this.agencyRepository.findOneBy({ id: userId })

        if (!agency) {
            throw new UnauthorizedException('Problema en los datos del usuario agencia')
        }

        const geocodeData = await this.mapsservice.geocodeAddress(tour.address)

        const newTour = await this.tourRepository.create({
            ...tour,
            country: geocodeData.country,
            region: geocodeData.region,
            state: geocodeData.state,
            lat: geocodeData.lat,
            lon: geocodeData.lon,
            display_name: geocodeData.display_name,
            agency: agency
        });

        await this.tourRepository.save(newTour)

        return newTour
    }

    async deleteAgency(id: string) {
        const Tour = await this.tourRepository.findOneBy({ id });

        if (!Tour) {
            throw new BadRequestException('La publicacion no existe')
        }

        await this.tourRepository.remove(Tour)

        return 'Publicacion eliminada correctamente'

    }

    async getToursBus() {
        const tours: TourEntity[] = await this.tourRepository.find({ where: { transportType: 'bus' }, relations: { agency: true } });

        if (tours.length == 0) {
            return 'No hay viajes con Autobus todavía';
        }

        return tours;
    }

    async getToursPlane() {
        const tours: TourEntity[] = await this.tourRepository.find({ where: { transportType: 'plane' }, relations: { agency: true } });

        if (tours.length == 0) {
            return 'No hay viajes con Avion todavía';
        }

        return tours;
    }

    async getToursOferta() {
        const tours: TourEntity[] = await this.tourRepository.find({ where: { oferta: true }, relations: { agency: true } });

        if (tours.length == 0) {
            return 'No hay viajes con Ofertas todavía';
        }

        return tours;
    }
}