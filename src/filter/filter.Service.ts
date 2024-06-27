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

  async searchGeneral(price:number,country:string,region:string,state:string) {
    if (!price||!country||!region||!state) {
        return [];
    }

    const tour = await this.tourRepository.createQueryBuilder('tour')
        .andWhere(
            qb => {
                qb.where('tour.country ILIKE :query', { query: `%${country}%` })
                    .orWhere('tour.state ILIKE :query', { query: `%${state}%` })
                    .orWhere('tour.region ILIKE :query', { query: `%${region}%` })
                    .orWhere('tour.price ILIKE :query', { query: `%${price}%` })
            }).getMany();

return [...tour];
}
}
