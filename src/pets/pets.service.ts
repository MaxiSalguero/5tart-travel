import { Injectable } from '@nestjs/common';
import { PetsRepository } from './pets.repository';
import { PetsEntity } from 'src/entidades/pets.entity';
@Injectable()
export class PetsService {
    constructor(private readonly petsRepository : PetsRepository){}

    getPets(){
        return this.petsRepository.getPets();
    }

    getPetById(id : string){
        return this.petsRepository.getPetById(id);
    }

    addPet(pet: Partial<PetsEntity>,shelterId:string){
        return this.petsRepository.addPet(pet,shelterId);
    }

    updatedPet(id : string, pet : Partial<PetsEntity>) {
        return this.petsRepository.updatedPet(id, pet)
    }
    conditionPet( id : string ){
        return this.petsRepository.conditionPet(id)
    }

    deletePet(id : string){
        return this.petsRepository.deletePet(id)
    }
}
