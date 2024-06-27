import { Injectable } from "@nestjs/common";
import { TourRepository } from "./tour.repository";

@Injectable()
export class TourService {
    constructor(private tourRepository: TourRepository){}
    
    getTours() {
        return this.tourRepository.getTours()
    }
    
    createTour(tour, userId){
        return this.tourRepository.createTour(tour, userId)
    }

    deleteAgency(id: string) {
        return this.tourRepository.deleteAgency(id)
    }

    getToursBus() {
        return this.tourRepository.getToursBus()
    }

    getToursPlane() {
        return this.tourRepository.getToursPlane()
    }
    
}