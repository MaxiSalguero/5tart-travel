import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UserServices {
  constructor(private readonly userRepository: UserRepository) {}

  addTourFavorite(tourId: string, userId: string) {
    return this.userRepository.addTourFavorite(tourId, userId);
  }

  updatedProfile(id: string, user: Partial<UserEntity>) {
    return this.userRepository.updatedProfile(id, user);
  }

  deleteTourFavorite(tourId: string, userId: string) {
    return this.userRepository.deleteTourFavorite(tourId, userId);
  }

  getUsers() {
    return this.userRepository.getUsers();
  }

  getUserById(id: string) {
    return this.userRepository.getUserById(id);
  }

  getSeenUser() {
    return this.userRepository.getSeenUser();
  }

  activeUser(id: string) {
    return this.userRepository.activeUser(id);
  }

  disableUser(id: string) {
    return this.userRepository.disableUser(id);
  }

  putSeenUser(id: string) {
    return this.userRepository.putSeenUser(id);
  }

  adminUser(id: string) {
    return this.userRepository.adminUser(id);
  }

  deleteAllUsers() {
    return this.userRepository.deleteAllUsers();
  }
}
