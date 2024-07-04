import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TourEntity } from 'src/entities/tour.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchRepository {
    constructor(@InjectRepository(TourEntity) private searchRepository: Repository<TourEntity>){}

    async searchLupa(query: string) {
        if (!query) {
          return [];
        }
    
        const words = query.split(' ');
    
        const results = await this.searchRepository
          .createQueryBuilder('tour')
          .where((qb) => {
            words.forEach((word, index) => {
              const parameter = `%${word}%`;
              if (index === 0) {
                qb.andWhere(
                  `(unaccent(tour.destino) ILIKE unaccent(:word${index}) OR tour.destino ILIKE :word${index})`,
                  { [`word${index}`]: parameter },
                )
                  .orWhere(
                    `(unaccent(tour.display_name) ILIKE unaccent(:word${index}) OR tour.display_name ILIKE :word${index})`,
                    { [`word${index}`]: parameter },
                  )
                  .orWhere(
                    `(unaccent(tour.title) ILIKE unaccent(:word${index}) OR tour.title ILIKE :word${index})`,
                    { [`word${index}`]: parameter },
                  )
                  .orWhere(
                    `(unaccent(tour.country) ILIKE unaccent(:word${index}) OR tour.country ILIKE :word${index})`,
                    { [`word${index}`]: parameter },
                  )
                  .orWhere(
                    `(unaccent(tour.region) ILIKE unaccent(:word${index}) OR tour.region ILIKE :word${index})`,
                    { [`word${index}`]: parameter },
                  )
                  .orWhere(
                    `(unaccent(tour.hotel) ILIKE unaccent(:word${index}) OR tour.hotel ILIKE :word${index})`,
                    { [`word${index}`]: parameter },
                  )
                  .orWhere(
                    `(unaccent(tour.empresa) ILIKE unaccent(:word${index}) OR tour.hotel ILIKE :word${index})`,
                    { [`word${index}`]: parameter },
                  );
              } else {
                qb.orWhere(
                  `(unaccent(tour.destino) ILIKE unaccent(:word${index}) OR tour.destino ILIKE :word${index})`,
                  { [`word${index}`]: parameter },
                )
                  .orWhere(
                    `(unaccent(tour.display_name) ILIKE unaccent(:word${index}) OR tour.display_name ILIKE :word${index})`,
                    { [`word${index}`]: parameter },
                  )
                  .orWhere(
                    `(unaccent(tour.title) ILIKE unaccent(:word${index}) OR tour.title ILIKE :word${index})`,
                    { [`word${index}`]: parameter },
                  )
                  .orWhere(
                    `(unaccent(tour.country) ILIKE unaccent(:word${index}) OR tour.country ILIKE :word${index})`,
                    { [`word${index}`]: parameter },
                  )
                  .orWhere(
                    `(unaccent(tour.region) ILIKE unaccent(:word${index}) OR tour.region ILIKE :word${index})`,
                    { [`word${index}`]: parameter },
                  )
                  .orWhere(
                    `(unaccent(tour.hotel) ILIKE unaccent(:word${index}) OR tour.hotel ILIKE :word${index})`,
                    { [`word${index}`]: parameter },
                  )
                  .orWhere(
                    `(unaccent(tour.empresa) ILIKE unaccent(:word${index}) OR tour.hotel ILIKE :word${index})`,
                    { [`word${index}`]: parameter },
                  );
              }
            });
          })
          .getMany();
    
        return results;
      }
}
