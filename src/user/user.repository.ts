import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TourEntity } from 'src/entities/tour.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(TourEntity)
    private readonly toursRepository: Repository<TourEntity>,
  ) {}

  async getUsers() {
    const users: UserEntity[] = await this.usersRepository.find({
      relations: { favorite_tours: true }
    });

    if (users.length == 0) {
      return 'No hay usuarios en la base de datos';
    }

    return users;
  }

  async createUser(user) {
    const ExistUser: UserEntity = await this.usersRepository.findOne({
      where: { mail: user.mail },
    });

    if (ExistUser) {
      throw new BadRequestException('El mail ingresado ya esta registrado');
    }

    const newUser = this.usersRepository.create({ ...user });
    await this.usersRepository.save(newUser);

    return 'Usuario Creado';
  }

  async addTourFavorite(id: string, userId: any) {
      const user: UserEntity = await this.usersRepository.findOne({
        where: { id: userId },
        relations: {favorite_tours: true}
      });
  
      if (!user) {
        throw new NotFoundException(`No se encontró el usuario`);
      }
  
      const tour: TourEntity = await this.toursRepository.findOneBy({ id: id });
  
      if (!tour) {
        throw new NotFoundException(`No se encontró el refugio`);
      }
  
      user.favorite_tours.push(tour);
  
      await this.usersRepository.save(user);
  
  
      return "Añadido a Favoritos";
    
  }
}
