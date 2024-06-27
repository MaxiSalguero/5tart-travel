import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TourEntity } from "src/entities/tour.entity";
import { Repository } from "typeorm";

@Injectable()
export class TourRepository {
    constructor(@InjectRepository(TourEntity)
                private tourRepository: Repository<TourEntity> ){}

    async getTours() {
        const Tours: TourEntity[] = await this.tourRepository.find({relations: {agency: true}})

        if (Tours.length == 0) {
            return 'No hay Publicaciones registradas en la base de datos'
        }

        return Tours
    }

    async createTour(tour) {

        const newTour = await this.tourRepository.create({...tour});
        await this.tourRepository.save(newTour)

        return 'Agencia creada'
    }

    async deleteAgency(id: string) {
        const Tour = await this.tourRepository.findOneBy({id});

        if (!Tour) {
            throw new BadRequestException('La publicacion no existe')
        }

        await this.tourRepository.remove(Tour)

        return 'Publicacion eliminada correctamente'

    }

}