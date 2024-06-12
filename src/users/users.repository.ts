import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entidades/users.entity';
import { MailService } from 'src/mails/mail.service';
import { Repository } from 'typeorm';
import * as cron from 'node-cron';
import { ShelterEntity } from 'src/entidades/shelter.entity';
import { PetsEntity } from 'src/entidades/pets.entity';

@Injectable()
export class UserRepository implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(ShelterEntity)
    private readonly sheltersRepository: Repository<ShelterEntity>,
    @InjectRepository(PetsEntity)
    private readonly petsRepository: Repository<PetsEntity>,
    private readonly mailService: MailService,
  ) {}
  async onModuleInit() {
    this.scheduleEmails();
  }

  async getUsers() {
    const users = await this.usersRepository.find({
      relations: ['pets', 'favorite_shelters', 'favorite_pets'],
    });

    if (users.length === 0) {
      throw new NotFoundException('No existen usuarios');
    }

    return users;
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.find({ where: { id } });
    if (!user) {
      throw new NotFoundException('no se encontro el usuario');
    }
    return { user };
  }

  async updatedProfile(id: string, user: Partial<UserEntity>) {
    const updateUser = await this.usersRepository.findOne({ where: { id } });
    if (!updateUser) {
      throw new NotFoundException(`no se encontro el usuario con id ${id}`);
    }
    await this.usersRepository.merge(updateUser, user);
    await this.usersRepository.save(updateUser);

    return ` el usuario con id ${id}  y nombre ${updateUser.name} se ah actualizado con exito`;
  }

  async deleteUser(id: string) {
    const deleteUser = await this.usersRepository.findOne({
      where: { id },
    });

    if (!deleteUser) {
      throw new NotFoundException(`no se encontro el usuario con id ${id}`);
    }
    if (deleteUser.isActive === false) {
      throw new NotFoundException('el usuario ya no existe');
    }
    deleteUser.isActive = false;

    await this.mailService.deleteUserMail(deleteUser.email, deleteUser.name);
    return this.usersRepository.save(deleteUser);
  }

  async activeUsers(id: string) {
    const activeUser = await this.usersRepository.findOne({
      where: { id },
    });

    if (!activeUser) {
      throw new NotFoundException(`no se encontro el usuario con id ${id}`);
    }

    if (activeUser.isActive === true) {
      throw new NotFoundException('el usuario ya esta activo');
    }
    activeUser.isActive = true;

    await this.mailService.deleteUserMail(activeUser.email, activeUser.name);
    return this.usersRepository.save(activeUser);
  }

  async scheduleEmails() {
    cron.schedule('0 0 1 */3 *', async () => {
      const users = await this.usersRepository.find();
      const subject = '¡Castraciones gratuitas en Huellas de Esperanza!';
      const text =
        '¡Te traemos una promoción especial! Huellas de Esperanza ofrece castraciones gratuitas para tu mascota. La próxima jornada se realizará pronto en nuestro refugio. ¡Visita nuestra página para obtener más información!';
      const html = `<div style="border: 2px solid #ff3366; padding: 20px; background: #ffffff; border-radius: 15px; text-align: center;">
            <p style="color: #ff3366; font-size: 24px; font-weight: bold; margin-bottom: 10px;">¡Castraciones gratuitas en Huellas de Esperanza!</p>
            <p style="color: #000; font-size: 16px;">¡Te traemos una promoción especial! Huellas de Esperanza ofrece <span style="font-weight: bold;">castraciones gratuitas</span> para tu mascota. La próxima jornada se realizará pronto en nuestro refugio. ¡Visita nuestra página para obtener más información!</p>
            <p style="color: #000; font-size: 16px;">¡No pierdas esta oportunidad y visita nuestra página para informarte sobre cómo participar!</p>
            <a href="http://tu-pagina-web.com" style="display: inline-block; padding: 10px 20px; background: #ff3366; color: #ffffff; text-decoration: none; border-radius: 5px; margin-top: 20px;">Visitar Huellas de Esperanza</a>
        </div>`;

      for (const user of users) {
        await this.mailService.sendMail(user.email, subject, text, html);
      }

      this.logger.log('Scheduled emails sent');
    });
  }

  async addShelterFavorite(id: string, userId: string) {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorite_shelters'],
    });

    if (!user) {
      throw new NotFoundException(`No se encontró el usuario`);
    }

    const shelter = await this.sheltersRepository.findOneBy({ id });

    if (!shelter) {
      throw new NotFoundException(`No se encontró el refugio`);
    }

    user.favorite_shelters.push(shelter);

    await this.usersRepository.save(user);

    return 'Añadido a Favoritos';
  }

  async addPetFavorite(petId: string, userId: string) {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorite_pets'],
    });

    if (!user) {
      throw new NotFoundException(`No se encontró el usuario`);
    }

    const pet: PetsEntity = await this.petsRepository.findOneBy({ id: petId });

    if (!pet) {
      throw new NotFoundException(`No se encontró la mascota`);
    }

    user.favorite_pets.push(pet);

    await this.usersRepository.save(user);

    return 'Añadido a Favoritos';
  }

  async getFavorites() {
    const Users: UserEntity[] = await this.usersRepository.find({
      relations: {
        favorite_pets: true,
        favorite_shelters: true,
      },
    });

    if (!Users) {
      throw new NotFoundException(`No hay favoritos`);
    }

    return Users;
  }

  async PutPetFavorite(petId: any, userId: string) {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorite_pets'],
    });

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
    const newPetsArray = user.favorite_pets.filter((pet) => pet.id != petId);

    user.favorite_pets = newPetsArray;

    await this.usersRepository.save(user);

    return 'Mascota eliminada de favoritos';
  }

  async PutShelterFavorite(shelterId: any, userId: string) {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorite_shelters'],
    });

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const newSheltersArray = user.favorite_shelters.filter(
      (shelter) => shelter.id != shelterId,
    );

    user.favorite_shelters = newSheltersArray;

    await this.usersRepository.save(user);

    return 'Refugio eliminado de favoritos';
  }
}
