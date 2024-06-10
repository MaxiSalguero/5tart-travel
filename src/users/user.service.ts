import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';

@Injectable()
export class UserService {
    constructor(private readonly usersRepository: UserRepository) { }

    getUsers() {
        return this.usersRepository.getUsers()
    }
    getFavorites() {
        return this.usersRepository.getFavorites()
    }
    
    getUserById(id: string) {
        return this.usersRepository.getUserById(id)
    }

    updatedProfile(id: string, user: any) {
        return this.usersRepository.updatedProfile(id, user)
    }

    deleteUser(id: string) {
        return this.usersRepository.deleteUser(id)
    }

    activeUsers(id: string) {
        return this.usersRepository.activeUsers(id)
    }

    addShelterFavorite(shelterId: string, userId: any) {
        return this.usersRepository.addShelterFavorite(shelterId,userId)
    }

    addPetFavorite(petId: string, userId: any) {
        return this.usersRepository.addPetFavorite(petId,userId)
    }

    PutPetFavorite(petId: any, userId: string) {
        return this.usersRepository.PutPetFavorite(petId,userId)
    }

    PutShelterFavorite(shelterId: any, userId: string) {
        return this.usersRepository.PutShelterFavorite(shelterId,userId)
    }

}
