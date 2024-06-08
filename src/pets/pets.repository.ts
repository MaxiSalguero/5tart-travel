import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth0Service } from "src/auth0/auth0.service";
import { CreatePetsDto } from "src/dto/createPets.dto";
import { PetsEntity } from "src/entidades/pets.entity";
import { ShelterEntity } from "src/entidades/shelter.entity";
import { Repository } from "typeorm";

@Injectable()
export class PetsRepository {
    constructor(@InjectRepository(PetsEntity) 
    private petsRepository: Repository<PetsEntity>,
@InjectRepository(ShelterEntity)
private shelterrepository: Repository<ShelterEntity>){}
    
    async getPets(){
        const Pets = await this.petsRepository.find({relations:['shelter']});

        if (!Pets) {
            throw new BadRequestException("El animal no existe");
        };
        return Pets;
    };
    
    async getPetById(id : string){
        const pet = await this.petsRepository.find({where:{id}})
        if (!pet) {
            throw new BadRequestException("El animal no existe");
        };
        
        return pet;
    };
    
    async addPet(pet: Partial<PetsEntity>,shelterId:string){
        const shelter = await this.shelterrepository.findOne({ where: { id: shelterId } });

        console.log(shelter)
            if (!shelter) {
                throw new Error('Shelter not found');
            }
        if (!shelterId) {
            throw new Error("Shelter ID is required");
        }
        const Pets = this.petsRepository.create({
            ...pet,
            shelter:shelter
        });
       
        await this.petsRepository.save(Pets);

        return "Mascota agregada correctamente";
    }
    
    async updatedPet(id: string, upet: Partial<PetsEntity>){
        const pet = await this.petsRepository.findOneBy({id});
        if (!pet) {
            throw new BadRequestException("El animal no existe")
        };
        await this.petsRepository.update(id, upet);
        const updatePet = await this.petsRepository.findOneBy({id});
        
        return updatePet;
    };
    async conditionPet( id : string ){
        const conditionpet= await this.petsRepository.findOne({
            where:{id}
        })
        if(!conditionpet){
            throw new NotFoundException(`no se encontro el mascota con id ${id}`)
        }
        if(conditionpet.isCondition===true){
            throw new NotFoundException('la mascota se encuentra con una condicion activa')
        }
        conditionpet.isCondition= true
        return this.petsRepository.save(conditionpet)
    }
    
    async deletePet(id: string){
       
            const deletePets = await this.petsRepository.findOne({
                where: { id },
              });
              if (!deletePets) {
                throw new NotFoundException(`no se encontro el mascota con id ${id}`);
              }
              if(deletePets.isActive===false){
                throw new NotFoundException('la mascota no existe')
              }
              deletePets.isActive = false;
              return this.petsRepository.save(deletePets);
            
        }
    
    
    async filterPets(breed?: string, pet_size?: string, age?: number,sexo?:string){
        const conditions: any = {isActive: true};

        if (breed) {
            conditions.breed = breed;
        }
        if (pet_size) {
            conditions.pet_size = pet_size;
        }
        if (age) {
            conditions.age = age;
        }
        if (sexo) {
            conditions.sexo = sexo;
        }
    
        return await this.petsRepository.find({ where: conditions });
    }

}