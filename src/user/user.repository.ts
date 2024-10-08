import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async addTourFavorite(id: string, userId: any) {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
      relations: { favorite_tours: true },
    });

    if (!user) {
      throw new NotFoundException(`No se encontró el usuario`);
    }

    const tour: TourEntity = await this.toursRepository.findOneBy({ id });

    if (!tour) {
      throw new NotFoundException(`No se encontró el tour`);
    }

    user.favorite_tours.push(tour);

    await this.usersRepository.save(user);

    return 'Añadido a Favoritos';
  }

  async updatedProfile(id: string, user: Partial<UserEntity>) {
    const updateUser = await this.usersRepository.findOne({ where: { id } });
    if (!updateUser) {
      throw new NotFoundException(`no se encontro el usuario con id ${id}`);
    }
    const newUser = this.usersRepository.merge(updateUser, user);
    await this.usersRepository.save(newUser);

    return newUser;
  }

  async deleteTourFavorite(id: string, userId: any) {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
      relations: { favorite_tours: true },
    });

    if (!user) {
      throw new NotFoundException(`No se encontró el usuario`);
    }

    const tour: TourEntity = await this.toursRepository.findOneBy({ id });

    if (!tour) {
      throw new NotFoundException(`No se encontró el tour`);
    }

    user.favorite_tours = user.favorite_tours.filter(
      (favoriteTour) => favoriteTour.id !== id,
    );

    await this.usersRepository.save(user);

    return 'Eliminado de Favoritos';
  }

  async getUsers() {
    const users: UserEntity[] = await this.usersRepository.find({
      relations: { favorite_tours: true, orders: true },
    });

    if (users.length == 0) {
      return 'No hay usuarios en la base de datos';
    }

    return users;
  }

  async getUserById(userId: string) {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
      relations: { favorite_tours: true },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async getSeenUser() {
    const disUser: UserEntity[] = await this.usersRepository.find({
      where: { isSeen: false },
    });

    if (disUser.length == 0) {
      return 'no hay Usuarios Nuevos';
    }

    return disUser;
  }

  async activeUser(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('no existe el usuario');
    }

    if (user.isActive === true) {
      throw new NotFoundException('el usuario ya esta activo');
    }

    user.isActive = true;
    user.role = 'user';

    const updateUser = this.usersRepository.save(user);

    return updateUser;
  }

  async disableUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`no se encontró el usuario con id ${id}`);
    }

    if (user.isActive === false) {
      throw new NotFoundException('el usuario ya se encuentra inactivo');
    }

    user.isActive = false;
    user.role = null;

    const updateUser = this.usersRepository.save(user);

    return updateUser;
  }

  async putSeenUser(id: string) {
    const disUser: UserEntity = await this.usersRepository.findOne({
      where: { id },
    });

    if (!disUser) {
      throw new BadRequestException('id no encontrado');
    }

    disUser.isSeen = true;
    await this.usersRepository.save(disUser);

    return disUser;
  }

  async adminUser(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException('no se encontro el usuario');
    if (user.role === 'admin')
      throw new BadRequestException('el usuario ya es un admin');

    user.role = 'admin';

    const updateUser = this.usersRepository.save(user);

    return updateUser;
  }

  async deleteAllUsers() {
    const users = await this.usersRepository.find({
      relations: ['favorite_tours', 'orders'],
    });

    if (users.length === 0) {
      throw new NotFoundException(
        'No hay usuarios en la base de datos para eliminar',
      );
    }

    const usersToDelete = users.filter(
      (user) => user.favorite_tours.length === 0 && user.orders.length === 0,
    );

    if (usersToDelete.length === 0) {
      throw new BadRequestException(
        'No se pueden eliminar los usuarios porque todos tienen relaciones activas.',
      );
    }

    try {
      await this.usersRepository.remove(usersToDelete);
      return `Se han eliminado ${usersToDelete.length} usuarios sin relaciones activas.`;
    } catch (error) {
      throw new ConflictException('Error eliminando los usuarios');
    }
  }
}
