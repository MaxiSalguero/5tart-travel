import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAdopcionDto } from "src/dto/createAdopcion.dto";
import { AdoptionEntity } from "src/entidades/adoption.entity";
import { PetsEntity } from "src/entidades/pets.entity";
import { ShelterEntity } from "src/entidades/shelter.entity";
import { UserEntity } from "src/entidades/user.entity";
import { PetsService } from "src/pets/pets.service";
import { Repository } from "typeorm";

@Injectable()
export class AdoptionRepository {

    constructor(
        @InjectRepository(AdoptionEntity)
         private adoptionrepository: Repository<AdoptionEntity>,
         @InjectRepository(ShelterEntity)
         private sheltersRepository: Repository<ShelterEntity>,
         @InjectRepository(UserEntity)
         private usersRepository: Repository<UserEntity>,
         @InjectRepository(PetsEntity)
         private petsRepository: Repository<PetsEntity>,
        private petsService: PetsService
        ){}


    async AllAdoptions(){
        const adoptions: AdoptionEntity[] = await this.adoptionrepository.find({
            relations:{
                user: true,
                pet: true
            }
        });
        
        if (!adoptions) {
            throw new NotFoundException('No existen adopciones');
        };

        return adoptions;
    }

    async AdoptionsById(id : string){
        const adoptionId: AdoptionEntity = await this.adoptionrepository.findOneBy({id}); 
        
        if (!adoptionId) {
            throw new NotFoundException('No existe la adopción');

        };

        return adoptionId;
    }

    async NewAdoption( userid: string, shelterid: string, petid: string){
        
        const user = await this.usersRepository.findOneBy({id: userid});
        if (!userid) {
            throw new BadRequestException(`Usuario no encontrado`);
        }
        const shelter = await this.sheltersRepository.findOneBy({id: shelterid});
        if (!shelterid) {
            throw new BadRequestException(`Refugio no encontrado`);
        }
        const pet = await this.petsRepository.findOneBy({id: petid});
        if (!petid) {
            throw new BadRequestException(`Mascota no encontrada`);
        }

        const adoption = new AdoptionEntity();
        adoption.date = new Date();
        adoption.user = user;
        adoption.shelter = shelter;
        adoption.pet = pet;

        const adop = await this.adoptionrepository.save(adoption)

        if (!adop) {
            throw new NotFoundException(`Error en la Adopción`);
        }

        this.petsService.deletePet(petid)

        return await this.adoptionrepository.find({
            where: {id: adoption.id},
            relations: {
                user: true,
                shelter: true,
                pet: true
            },
        })

    }

    async Delete(id : string){
        const adoption = await this.adoptionrepository.findOneBy({id});
        if (!adoption) {
            throw new NotFoundException('No existe la adopción');
        };
        await this.adoptionrepository.remove(adoption);
        
        return `La adopción fue eliminada`;
    }

    async AdoptionUser( userid :string){
        const user: UserEntity = await this.usersRepository.findOne({
            where:{id: userid},
            relations:{
                adoptions: true
            }
        });
    
        return user;
    }

    async AdoptionShelter(shelterid : string){
        const shelter: ShelterEntity = await this.sheltersRepository.findOne({
            where:{id: shelterid},
            relations:{
                adoptions: true
            }
        });
    
        return shelter;
    }

}