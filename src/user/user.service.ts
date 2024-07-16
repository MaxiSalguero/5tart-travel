import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UserServices {
  constructor(private userRepository: UserRepository) {}

  getUsers() {
    return this.userRepository.getUsers();
  }

  addTourFavorite(id: string, userId: any) {
    return this.userRepository.addTourFavorite(id, userId);
  }

  deleteAllUsers() {
    return this.userRepository.deleteAllUsers();
  }

  deleteTourFavorite(id: string, userId: any) {
    return this.userRepository.deleteTourFavorite(id, userId);
  }

  getUserById(id: string) {
    return this.userRepository.getUserById(id);
  }

  updatedProfile(id: string, user: Partial<UserEntity>) {
    return this.userRepository.updatedProfile(id, user);
  }

  activeUser(id: string) {
    return this.userRepository.activeUser(id);
  }

  disableUser(id: string) {
    return this.userRepository.disableUser(id);
  }

  adminUser(id: string) {
    return this.userRepository.adminUser(id);
  }

  async putSeenUser(id: string) {
    return this.userRepository.putSeenUser(id)
  };

  getSeenUser() {
    return this.userRepository.getSeenUser()
  }
}
