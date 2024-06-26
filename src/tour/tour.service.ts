import { Injectable } from "@nestjs/common";
import { TourRepository } from "./tour.repository";

@Injectable()
export class TourService {
    constructor(private tourRepository: TourRepository){}
    
    getTours() {
        return this.tourRepository.getTours()
    }
    
    createAgency(tour){
        return this.tourRepository.createAgency(tour)
    }

    deleteAgency(id: string) {
        return this.tourRepository.deleteAgency(id)
    }
}