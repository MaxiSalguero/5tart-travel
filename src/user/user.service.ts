import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserServices {
  constructor(private userRepository: UserRepository) {}

  getUsers() {
    return this.userRepository.getUsers();
  }

  addTourFavorite(id: string, userId: any) {
    return this.userRepository.addTourFavorite(id, userId)
  }
  getUserById(id){
    return this.userRepository.getUserById(id)
  }
}
