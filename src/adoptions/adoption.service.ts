import { Injectable } from '@nestjs/common';
import { AdoptionRepository } from './adoption.repository';
import { AdoptionEntity } from 'src/entidades/adoption.entity';
import { UserEntity } from 'src/entidades/users.entity';
import { ShelterEntity } from 'src/entidades/shelter.entity';
import { CreateAdopcionDto } from 'src/dto/createAdopcion.dto';

@Injectable()
export class AdoptionService {
  constructor(private readonly adoptionrepository: AdoptionRepository) {}

  async AllAdoptions() {
    return await this.adoptionrepository.AllAdoptions();
  }

  async adoptionsById(id: string) {
    return await this.adoptionrepository.AdoptionsById(id);
  }

  async newAdoption(user: string, pet: string) {
    return await this.adoptionrepository.newAdoption(user, pet);
  }

  async Delete(id: string) {
    return await this.adoptionrepository.Delete(id);
  }

  async activateAdoption(adoptionId: string) {
    return await this.adoptionrepository.activateAdoption(adoptionId);
  }

  async adoptionUser(userid: string) {
    return await this.adoptionrepository.AdoptionUser(userid);
  }

  async adoptionShelter(shelterid: string) {
    return await this.adoptionrepository.AdoptionShelter(shelterid);
  }
}
