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

  deleteTourFavorite(id: string, userId: any) {
    return this.userRepository.deleteTourFavorite(id, userId)
  }

  getUserById(id){
    return this.userRepository.getUserById(id)
  }

  activeUser(id: string) {
    return this.userRepository.activeUser(id);
  }

  disableUser(id: string) {
    return this.userRepository.disableUser(id);
  }
}
