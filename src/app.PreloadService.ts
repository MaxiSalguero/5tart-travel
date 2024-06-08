import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShelterEntity } from './entidades/shelter.entity';
import { PetsEntity } from './entidades/pets.entity';
import * as dataPets from "./helpers/loadPets.json";
import * as dataShelters from "./helpers/loadShelters.json";

@Injectable()
export class PreloadService implements OnModuleInit {
    constructor(
        @InjectRepository(ShelterEntity)
        private readonly sheltersRepository: Repository<ShelterEntity>,
        @InjectRepository(PetsEntity)
        private readonly petsRepository: Repository<PetsEntity>
    ) {}

    async onModuleInit() {
        await this.loadShelters();
        await this.loadPets();
    }

    async loadShelters() {
        for (const shelter of dataShelters) {
            const existingShelter = await this.sheltersRepository.findOne({
                where: {
                    name: shelter.name,
                    email: shelter.email,
                    phone: shelter.phone,
                    dni: shelter.dni,
                    shelter_name: shelter.shelter_name,
                    location: shelter.location,
                    description: shelter.description,
                    imgUrl:shelter.imgUrl,
                    zona: shelter.zona
                },
            });

            if (!existingShelter) {
                await this.sheltersRepository.save(shelter);
            }
        }

        return "Refugios cargados";
    }

    async loadPets() {
        for (const pet of dataPets) {
            const shelter = await this.sheltersRepository.findOne({
                where: { shelter_name: pet.shelter }
            });

            if (shelter) {
                const existingPet = await this.petsRepository.findOne({
                    where: {
                        name: pet.name,
                        breed: pet.breed,
                        sexo: pet.sexo,
                        age: pet.age,
                        month:pet.month,
                        pet_size: pet.pet_size,
                        imgUrl: pet.imgUrl,
                        description: pet.description,
                        shelter: shelter
                    },
                });

                if (!existingPet) {
                    await this.petsRepository.save({ ...pet, shelter: shelter });
                }
            }
        }

        return "Mascotas cargadas";
    }
}
