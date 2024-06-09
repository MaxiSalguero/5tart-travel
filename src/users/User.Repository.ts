import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entidades/user.entity';
import { MailService } from 'src/mails/mail.service';
import { Repository } from 'typeorm';
import * as cron from 'node-cron';
import { ShelterEntity } from 'src/entidades/shelter.entity';

@Injectable()
export class UserRepository implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(ShelterEntity)
    private readonly sheltersRepository: Repository<ShelterEntity>,
    private readonly mailService: MailService,
  ) {}
  async onModuleInit() {
    this.scheduleEmails();
  }
  async getUsers() {
    const users = await this.usersRepository.find();

    if (users.length === 0) {
      throw new NotFoundException('no existen usuarios');
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
      const subject = 'Nuevas oportunidades de adopción';
      const text =
        'Huellas de esperanza tiene nuevas oportunidades de animalitos peludos para adoptar.';
      const html =
        '<p>Huellas de esperanza tiene nuevas oportunidades de animalitos peludos para adoptar.</p>';

      for (const user of users) {
        await this.mailService.sendMail(user.email, subject, text, html);
      }

      this.logger.log('Scheduled emails sent');
    });
  }

  async addShelterFavorite(id: string, userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorite'],
    });

    if (!user) {
      throw new NotFoundException(`No se encontró el usuario`);
    }

    const shelter = await this.sheltersRepository.findOneBy({ id });

    if (!shelter) {
      throw new NotFoundException(`No se encontró el refugio`);
    }

    user.favorite.push(shelter);

    await this.usersRepository.save(user);

    return 'Añadido a Favoritos';
  }

  async getFavorites() {
    const Users: UserEntity[] = await this.usersRepository.find({
      relations: {
        favorite: true,
      },
    });

    if (!Users) {
      throw new NotFoundException(`No hay favoritos`);
    }

    return Users;
  }
}
