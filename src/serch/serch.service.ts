import { Injectable } from '@nestjs/common';
import { PetsRepository } from 'src/pets/pets.repository';
import { SearchRepository } from './serch.repository';
import { SheltersService } from 'src/shelters/shelters.service';

@Injectable()
export class SerchService {
  constructor(
    private readonly petsRepository: PetsRepository,
    private readonly shelterService: SheltersService,
    private readonly searchRepository: SearchRepository,
  ) {}

  filterPets(breed?: string, pet_size?: string, age?: number, sexo?: string) {
    return this.petsRepository.filterPets(breed, pet_size, age, sexo);
  }

  filterShelters(exotic_animals?: string, location?: string, zona?: string) {
    return this.shelterService.filterShelters(exotic_animals, location, zona);
  }

  searchGeneral(
    exotic_animals?,
    location?,
    shelter_name?,
    breed?,
    pet_size?,
    age?,
  ) {
    return this.searchRepository.searchGeneral(
      exotic_animals,
      location,
      shelter_name,
      breed,
      pet_size,
      age,
    );
  }
}
