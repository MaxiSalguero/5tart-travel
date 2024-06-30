import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AgencyEntity } from 'src/entities/agency.entity';
import { UserEntity } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { mailsServices } from 'src/mails/mails.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AgencyEntity)
    private readonly agencyRepository: Repository<AgencyEntity>,
    private readonly mailservice: mailsServices,
  ) {}

  async createUser(user: Partial<UserEntity>) {
    const { mail, password } = user;

    const dbUser = await this.userRepository.findOneBy({ mail });

    if (dbUser) throw new ConflictException('Esta email ya existe');

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword)
      throw new BadRequestException('El password no pudo ser hasheado');

    const createdUser = await this.userRepository.save({
      ...user,
      password: hashedPassword,
    });

    if (createdUser) {
      await this.mailservice.registerUserMail(
        user.mail,
        user.username,
        user.password,
      );
    }

    return createdUser;
  }

  async createAgency(agency: Partial<AgencyEntity>) {
    const { mail, password } = agency;
    const dbAgency = await this.agencyRepository.findOneBy({ mail });

    if (dbAgency) {
      throw new ConflictException('El Email ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword)
      throw new BadRequestException('El password no pudo ser hasheado');

    const createdAgency = await this.agencyRepository.save({
      ...agency,
      password: hashedPassword,
    });

    return createdAgency;
  }

  async login(mail: string, password: string) {
    let user = await this.userRepository.findOneBy({ mail });
    let agency = null;

    if (!user) {
      agency = await this.agencyRepository.findOneBy({ mail });
    }

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        throw new UnauthorizedException('Credenciales incorrectas');

      const userpayload = {
        sub: user.id,
        id: user.id,
        email: user.mail,
        username: user.username,
        type: 'user',
      };

      const token = this.jwtService.sign(userpayload);

      return { success: 'Usuario logueado correctamente', token };
    } else if (agency) {
      const isPasswordValid = await bcrypt.compare(password, agency.password);
      if (!isPasswordValid)
        throw new UnauthorizedException('Credenciales incorrectas');

      const agencypayload = {
        sub: agency.id,
        id: agency.id,
        email: agency.mail,
        name_agency: agency.name_agency,
        type: 'agency',
      };

      const token = this.jwtService.sign(agencypayload);

      return { success: 'Agencia logueada correctamente', token };
    } else {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
  }
}
