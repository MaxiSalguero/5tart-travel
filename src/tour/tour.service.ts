import { Injectable } from '@nestjs/common';
import { TourRepository } from './tour.repository';
import { TourEntity } from 'src/entities/tour.entity';

@Injectable()
export class TourService {
  constructor(private tourRepository: TourRepository) {}

  createTour(tour: Partial<TourEntity>, userId: string) {
    return this.tourRepository.createTour(tour, userId);
  }

  addTourImg(id: string, imgUrl) {
    return this.tourRepository.addTourImg(id, imgUrl);
  }

  updateTour(id: string, tour: Partial<TourEntity>) {
    return this.tourRepository.updateTour(id, tour);
  }

  removeTourImg(id: string, imgUrl: string) {
    return this.tourRepository.removeTourImg(id, imgUrl);
  }

  deleteTour(id: string) {
    return this.tourRepository.deleteTour(id);
  }

  mailoferta(email: string) {
    return this.tourRepository.mailOfertas(email);
  }

  getTours() {
    return this.tourRepository.getTours();
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

  getTourById(id: string) {
    return this.tourRepository.getTourById(id);
  }
}
