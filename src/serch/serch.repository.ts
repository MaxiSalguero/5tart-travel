import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { emit } from 'process';
import { PetsEntity } from 'src/entidades/pets.entity';
import { ShelterEntity } from 'src/entidades/shelter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchRepository {
    constructor(
        @InjectRepository(ShelterEntity)
        private readonly sheltersRepository: Repository<ShelterEntity>,
        @InjectRepository(PetsEntity)
        private readonly petsRepository: Repository<PetsEntity>,
    ) { }

    async searchGeneral(exotic_animals, location, shelter_name, breed, pet_size, age) {

        const sconditions: any = { isActive: true };

        if (exotic_animals) {
            sconditions.exotic_animals = exotic_animals;
        }
        if (location) {
            sconditions.location = location;
        }
        if (shelter_name) {
            sconditions.shelter_name = shelter_name;
        }

        const shelters: ShelterEntity[] = await this.sheltersRepository.find({ where: sconditions })

        const sheltersFiltrados = shelters.map((shelter) => {
            const { email, name, dni, isActive, ...shelterfil } = shelter

            return shelterfil;
        })


        const pconditions: any = { isActive: true };

        if (breed) {
            pconditions.breed = breed;
        }
        if (pet_size) {
            pconditions.pet_size = pet_size;
        }
        if (age) {
            pconditions.age = age;
        }
        


        const pets: PetsEntity[] = await this.petsRepository.find({ where: pconditions })

        const petsFiltrados = pets.map((pet) => {
            const { isActive, godfather, ...petfil } = pet
            return petfil
        })

        return { sheltersFiltrados, petsFiltrados };
    }

}
