import { Injectable } from "@nestjs/common";
import { TourRepository } from "./tour.repository";

@Injectable()
export class TourService {
    constructor(private tourRepository: TourRepository){}
    
    getTours() {
        return this.tourRepository.getTours()
    }
    
    createTour(tour){
        return this.tourRepository.createTour(tour)
    }

    deleteAgency(id: string) {
        return this.tourRepository.deleteAgency(id)
    }
}