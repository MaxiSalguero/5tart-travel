import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TourEntity } from 'src/entities/tour.entity';
import { Repository } from 'typeorm';

@Injectable()
export class filterService {
  constructor(
    @InjectRepository(TourEntity)
    private tourRepository: Repository<TourEntity>,
  ) {}

  async searchGeneral(
    price: number,
    country: string,
    region: string,
    state: string,
  ) {
    const sconditions: any = {};

    if (price) {
      sconditions.price = price;
    }
    if (country) {
      sconditions.country = country;
    }
    if (region) {
      sconditions.region = region;
    }
    if (state) {
      sconditions.state = state;
    }

    const tourFil = await this.tourRepository.find({ where: sconditions });

    return tourFil;
  }
}
