import { Injectable } from '@nestjs/common';
import { PetsRepository } from 'src/pets/pets.repository';
import { ShelterRepository } from 'src/shelters/shelters.repository';
import { SearchRepository } from './serch.repository';


@Injectable()
export class SerchService {
    constructor(
        private readonly petsRepository: PetsRepository,
        private readonly sheltersRepository: ShelterRepository,
        private readonly searchRepository: SearchRepository
    ) { }


    filterPets(breed?: string, pet_size?: string, age?: number,sexo?:string) {
        return this.petsRepository.filterPets(breed, pet_size, age,sexo);
    };

    filterShelters(exotic_animals?: string, location?: string,zona?:string) {
        return this.sheltersRepository.filterShelters(exotic_animals, location,zona);
    };


    searchGeneral(exotic_animals?, location?, shelter_name?, breed?, pet_size?, age?) {
        return this.searchRepository.searchGeneral(exotic_animals, location, shelter_name, breed, pet_size, age);
    };
}
