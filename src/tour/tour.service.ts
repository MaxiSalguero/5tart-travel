import { Injectable } from '@nestjs/common';
import { TourRepository } from './tour.repository';

@Injectable()
export class TourService {
  constructor(private tourRepository: TourRepository) {}

  getTours() {
    return this.tourRepository.getTours();
  }

  createTour(tour, userId) {
    return this.tourRepository.createTour(tour, userId);
  }

  deleteTour(id: string) {
    return this.tourRepository.deleteTour(id);
  }

  getToursBus() {
    return this.tourRepository.getToursBus();
  }

  getToursPlane() {
    return this.tourRepository.getToursPlane();
  }

  getToursOferta() {
    return this.tourRepository.getToursOferta();
  }
  mailoferta(email: string) {
    return this.tourRepository.mailOfertas(email);
  }
  getTourById(id: string) {
    return this.tourRepository.getTourById(id);
  }
}
