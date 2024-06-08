import { Injectable } from '@nestjs/common';
import { ShelterRepository } from './shelters.repository';
import { ShelterEntity } from 'src/entidades/shelter.entity';

@Injectable()
export class SheltersService {
  constructor(private readonly sheltersRepository: ShelterRepository) {}

  getShelters() {
    return this.sheltersRepository.getShelters();
  }

  getShelterById(id: string) {
    return this.sheltersRepository.getShelterById(id);
  }
  updatedProfile(id : string, shelter : Partial<ShelterEntity>){
    return this.sheltersRepository.updatedProfile(id, shelter);
  }

  deleteShelter(id: string, accessToken) {
    return this.sheltersRepository.deleteShelter(id, accessToken);
  }

 ActiveShelter(id: string, accessToken) {
    return this.sheltersRepository.ActiveShelter(id, accessToken);
  }
}
