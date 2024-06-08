import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from 'src/entidades/user.entity';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShelterEntity } from 'src/entidades/shelter.entity';
import { MailService } from 'src/mails/mail.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(MailService.name);
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ShelterEntity)
    private shelterRepository: Repository<ShelterEntity>,
    private readonly mailService: MailService,
  ) {}

  async RegisterUser(
    email: string,
    password: string,
    metadata: Partial<UserEntity>,
    accessToken: string,
  ) {
    const existingUser = await this.userRepository.findOneBy({ email });

    if (existingUser) {
      throw new ConflictException(
        'Este email ya se encuentra asociado a un usuario',
      );
    }

    await this.mailService.registerUserMail(email, metadata.name, password);
    return this.Register(email, password, metadata, accessToken, 'user');
  }

  async RegisterShelter(
    email: string,
    password: string,
    metadata: Partial<ShelterEntity>,
    accessToken: string,
  ) {
    const existingShelterDNI = await this.shelterRepository.findOneBy({
      dni: metadata.dni,
    });
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
        shelter_name: metadata.shelter_name,
        zona: metadata.zona,
      },
    });

    if (existingShelter) {
      throw new ConflictException(
        'A shelter with the same name already exists in this zone.',
      );
    }
    await this.mailService.registershelterMail(
      email,
      metadata.shelter_name,
      password,
    );
    return this.Register(email, password, metadata, accessToken, 'shelter');
  }

  async Register(
    email: string,
    password: string,
    metadata: Partial<UserEntity> | Partial<ShelterEntity>,
    accessToken: string,
    type: 'user' | 'shelter',
  ) {
    try {
      let userID: string;

      if (type === 'user') {
        const newUser = this.userRepository.create({
          ...metadata,
          email,
        } as Partial<UserEntity>);

        userID = newUser.id;

        await this.userRepository.save(newUser);
      } else if (type === 'shelter') {
        const newShelter = this.shelterRepository.create({
          ...metadata,
          email,
        } as Partial<ShelterEntity>);

        userID = newShelter.id;

        await this.shelterRepository.save(newShelter);
      }

      const newMetadata = { ...metadata, userID };

      await axios.post(
        `${process.env.AUTH0_MGMT_API_URL}users`,
        {
          email,
          password,
          connection: 'Username-Password-Authentication',
          user_metadata: newMetadata,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return { succes: 'Usuario registrado correctamente' };
    } catch (error) {
      throw new BadRequestException('Error creating user');
    }
  }

  async Login(email: string, password: string) {
    const existingAccoutUser = await this.userRepository.findOneBy({ email });
    const existingAccountShelter = await this.shelterRepository.findOneBy({
      email,
    });

    if (!existingAccoutUser && !existingAccountShelter) {
      throw new ConflictException('Correo inexistente en nuestros registros');
    }

    try {
      const response = await axios.post(
        `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
        {
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          audience: process.env.AUTH0_MGMT_API_AUDIENCE,
          grant_type: 'password',
          username: email,
          password: password,
          scope: 'openid profile email',
        },
      );

      const { access_token, id_token } = response.data;

      return { succes: 'Usuario logueado correctamente', access_token, id_token };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
