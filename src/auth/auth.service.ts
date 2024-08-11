import {
  BadRequestException,
  ConflictException,
  ImATeapotException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AgencyEntity } from 'src/entities/agency.entity';
import { UserEntity } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { MailsServices } from 'src/mails/mails.service';
import { AgencyGateway } from 'src/agency/agency.gateway';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AgencyEntity)
    private readonly agencyRepository: Repository<AgencyEntity>,
    private readonly mailservice: MailsServices,
    private readonly agencyGateway: AgencyGateway,
  ) {}

  async createUser(user: Partial<UserEntity>) {
    const { mail, password } = user;

    const dbUser = await this.userRepository.findOneBy({ mail });
    const dbAgency = await this.agencyRepository.findOneBy({ mail });

    if (dbUser || dbAgency) throw new ConflictException('Esta email ya existe');

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword)
      throw new BadRequestException('El password no pudo ser hasheado');

    const createdUser = await this.userRepository.save({
      ...user,
      password: hashedPassword,
    });

    this.agencyGateway.emitUserUpdate();

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
    const dbUser = await this.userRepository.findOneBy({ mail });
    const dbAgency = await this.agencyRepository.findOneBy({ mail });

    if (dbUser || dbAgency) throw new ConflictException('Esta email ya existe');

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword)
      throw new BadRequestException('El password no pudo ser hasheado');

    const createdAgency = await this.agencyRepository.save({
      ...agency,
      password: hashedPassword,
    });

    this.agencyGateway.emitAgencyUpdate();

    if (createdAgency) {
      await this.mailservice.registerAgencyMail(
        createdAgency.mail,
        createdAgency.name_agency,
        createdAgency.password,
      );
    }

    return createdAgency;
  }

  async login(mail: string, password: string) {
    const user = await this.userRepository.findOneBy({ mail });
    let agency = null;

    if (!user) {
      agency = await this.agencyRepository.findOneBy({ mail });
    }

    if (user) {
      const isActive = user.role ? true : false;
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        throw new UnauthorizedException('Credenciales incorrectas');
      if (!isActive)
        throw new ImATeapotException('Esta agencia aun no se encuentra activa');

      const userpayload = {
        sub: user.id,
        id: user.id,
        email: user.mail,
        username: user.username,
        role: user.role,
        type: 'user',
      };

      const token = this.jwtService.sign(userpayload);

      return { success: 'Usuario logueado correctamente', token };
    } else if (agency) {
      const isActive = agency.role ? true : false;
      const isPasswordValid = await bcrypt.compare(password, agency.password);
      if (!isPasswordValid)
        throw new UnauthorizedException('Credenciales incorrectas');
      if (!isActive)
        throw new ImATeapotException('Esta agencia aun no se encuentra activa');

      const agencypayload = {
        sub: agency.id,
        id: agency.id,
        email: agency.mail,
        name_agency: agency.name_agency,
        address: agency.address,
        imgUrl: agency.imgUrl,
        role: agency.role,
        type: 'agency',
      };
      await this.mailservice.agencyAcceptedMail(
        agency.mail,
        agency.name_agency,
      );
      const token = this.jwtService.sign(agencypayload);

      return { success: 'Agencia logueada correctamente', token };
    } else {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
  }

  async foundEmail(mail: string) {
    const existingUser = await this.userRepository.findOneBy({ mail });
    const existingAgency = await this.agencyRepository.findOneBy({ mail });

    if (existingUser) {
      await this.mailservice.cambioPasswordMail(
        existingUser.mail,
        existingUser.username,
      );
      return { id: existingUser.id, type: 'user' };
    } else if (existingAgency) {
      await this.mailservice.cambioPasswordMail(
        existingAgency.mail,
        existingAgency.name_agency,
      );
      return { id: existingAgency.id, type: 'agency' };
    } else {
      throw new NotFoundException('Este email no se encuentra registrado');
    }
  }

  async changePassword(id: string, type: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    let userEmail: string, username: string;

    if (type === 'user') {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      await this.userRepository.update(id, { password: hashedPassword });
      userEmail = user.mail;
      username = user.username;
    } else if (type === 'agency') {
      const agency = await this.agencyRepository.findOne({ where: { id } });
      if (!agency) {
        throw new NotFoundException('Agencia no encontrada');
      }
      await this.agencyRepository.update(id, { password: hashedPassword });
      userEmail = agency.mail;
      username = agency.name_agency;
    } else {
      throw new ConflictException('Tipo de entidad no reconocido');
    }

    await this.mailservice.ConfirmCambiodePassword(
      userEmail,
      username,
      newPassword,
    );

    return {
      message: `El password del ${type === 'user' ? 'usuario' : 'agencia'} con ID: ${id}, fue modificado correctamente`,
    };
  }
}
