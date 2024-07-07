import {
  BadRequestException,
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

  async getUsers() {
    const users: UserEntity[] = await this.usersRepository.find({
      relations: { favorite_tours: true },
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
      relations: { favorite_tours: true },
    });

    if (!user) {
      throw new NotFoundException(`No se encontró el usuario`);
    }

    const tour: TourEntity = await this.toursRepository.findOneBy({ id: id });

    if (!tour) {
      throw new NotFoundException(`No se encontró el tour`);
    }

    user.favorite_tours.push(tour);

    await this.usersRepository.save(user);

    return 'Añadido a Favoritos';
  }

  async deleteTourFavorite(id: string, userId: any) {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
      relations: { favorite_tours: true },
    });

    if (!user) {
      throw new NotFoundException(`No se encontró el usuario`);
    }

    const tour: TourEntity = await this.toursRepository.findOneBy({ id: id });

    if (!tour) {
      throw new NotFoundException(`No se encontró el tour`);
    }

    user.favorite_tours = user.favorite_tours.filter(
      (favoriteTour) => favoriteTour.id !== id,
    );

    await this.usersRepository.save(user);

    return 'Eliminado de Favoritos';
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

  async adminUser(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException('no se encontro el usuario');
    if (user.role === 'admin')
      throw new BadRequestException('el usuario ya es un admin');

    user.role = 'admin';

    const updateUser = this.usersRepository.save(user);

    return updateUser;
  }
}
