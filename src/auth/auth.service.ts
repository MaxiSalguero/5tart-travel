import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from 'src/entidades/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShelterEntity } from 'src/entidades/shelter.entity';
import { MailService } from 'src/mails/mail.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(MailService.name);
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ShelterEntity)
    private shelterRepository: Repository<ShelterEntity>,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(register: Partial<UserEntity>) {
    const { email, password, name } = register;

    const existingUser = await this.userRepository.findOneBy({ email });

    if (existingUser) {
      throw new ConflictException(
        'Este email ya se encuentra asociado a un usuario',
      );
    }

    await this.mailService.registerUserMail(email, name, password);
    return this.Register(email, password, register, 'user');
  }

  async registerShelter(register: Partial<ShelterEntity>) {
    const { email, dni, shelter_name, zona, password } = register;

    const existingShelterDNI = await this.shelterRepository.findOneBy({ dni });
    if (existingShelterDNI) {
      throw new ConflictException(
        'Este DNI ya se encuentra asociado a un refugio',
      );
    }

    const existingShelterEmail = await this.shelterRepository.findOneBy({
      email,
    });

    if (existingShelterEmail) {
      throw new ConflictException(
        'Este email ya se encuentra asociado a un refugio',
      );
    }

    const existingShelter = await this.shelterRepository.findOne({
      where: {
        shelter_name,
        zona,
      },
    });

    if (existingShelter) {
      throw new ConflictException(
        'A shelter with the same name already exists in this zone.',
      );
    }
    await this.mailService.registershelterMail(email, shelter_name, password);
    return this.Register(email, password, register, 'shelter');
  }

  async Register(
    email: string,
    password: string,
    register: Partial<UserEntity> | Partial<ShelterEntity>,
    type: 'user' | 'shelter',
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword)
      throw new BadRequestException('El password no pudo ser hasheado');

    if (type === 'user') {
      await this.userRepository.save({ ...register, password: hashedPassword });
    } else if (type === 'shelter') {
      await this.shelterRepository.save({
        ...register,
        password: hashedPassword,
      });
    }

    return { succes: 'Usuario registrado correctamente' };
  }

  async loginUser(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Credenciales incorrectas');

    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      roles: user.role
    };

    const token = this.jwtService.sign(userPayload);

    return { succes: 'Usuario logueado correctamente', token };
  }

  async loginShelter(email: string, password: string) {
    const shelter = await this.shelterRepository.findOneBy({ email });
    if (!shelter) throw new UnauthorizedException('Credenciales incorrectas');

    const isPasswordValid = await bcrypt.compare(password, shelter.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Credenciales incorrectas');

    const shelterPayload = {
      sub: shelter.id,
      id: shelter.id,
      email: shelter.email,
      roles: shelter.role
    };

    const token = this.jwtService.sign(shelterPayload);

    return { succes: 'Refugio logueado correctamente', token };
  }
}
