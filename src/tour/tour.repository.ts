import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TourEntity } from "src/entities/tour.entity";
import { MapsService } from "src/maps/maps.service";
import { Repository } from "typeorm";

@Injectable()
export class TourRepository {
    constructor(@InjectRepository(TourEntity)
    private tourRepository: Repository<TourEntity>,
        private readonly mapsservice: MapsService) { }

    async getTours() {
        const Tours: TourEntity[] = await this.tourRepository.find({ relations: { agency: true } })

        if (Tours.length == 0) {
            return 'No hay Publicaciones registradas en la base de datos'
        }

        return Tours
    }

    async createTour(tour) {
        const geocodeData = await this.mapsservice.geocodeAddress(tour.address)
        console.log(tour)
        const newTour = await this.tourRepository.create({
            ...tour,
            country: geocodeData.country,
            region: geocodeData.region,
            state: geocodeData.state,
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

}