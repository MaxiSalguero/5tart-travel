import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TourEntity } from 'src/entities/tour.entity';
import { Repository } from 'typeorm';


@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(TourEntity)
    private tourRepository: Repository<TourEntity>,
  ) {}

  async findByLocation(country: string, region: string, state: string): Promise<TourEntity[]> {
    const tours = await this.tourRepository.find({
      where: {
        country,
        region,
        state,
      },
    });
    return tours;
  }
}
