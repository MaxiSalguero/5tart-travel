import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AgencyRepository } from 'src/agency/agency.repository';
import { AgencyEntity } from 'src/entities/agency.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from "bcrypt";
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/DTOS/CreateUser.dto';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository,
                private agencyRepository: AgencyRepository,
                private readonly jwtService: JwtService,
                @InjectRepository(UserEntity)
                private readonly userDB: Repository<UserEntity>,
                @InjectRepository(AgencyEntity)
                private readonly agencyDb: Repository<AgencyEntity>
    ){}
    
    async createUser(user: CreateUserDto) {
        const dbUser = await this.userDB.findOneBy({mail: user.mail})


        if (user.password != user.confirm_password) {
            throw new BadRequestException('La contraseña no coincide')
        }
        const {confirm_password , ...Nuser } = user

        if (dbUser) {
            throw new BadRequestException("El Email ya existe")
        }

        const hashed = await bcrypt.hash(user.password, 10);

        if (!hashed) {
            throw new BadRequestException("Password no encryptada")
        }

        return this.userRepository.createUser({...Nuser, password: hashed})
    }

    async createAgency(agency) {
        const dbAgency = await this.userDB.findOneBy({mail: agency.mail})


        if (agency.password != agency.confirm_password) {
            throw new BadRequestException('La contraseña no coincide')
        }

        const {confirm_password , ...Nuser } = agency

        if (dbAgency) {
            throw new BadRequestException("El Email ya existe")
        }

        const hashed = await bcrypt.hash(agency.password, 10);

        if (!hashed) {
            throw new BadRequestException("Password no encryptada")
        }

        return this.agencyRepository.createAgency({...Nuser, password: hashed})
    }

    async login(log) {

        const agency: AgencyEntity = await this.agencyDb.findOneBy({mail: log.mail});

        if (agency) {
            
            const isPassword = await bcrypt.compare(log.password, agency.password);

            if (!isPassword) {
                throw new BadRequestException("Mail o Contraseña incorrecta");
            };
            
            const userpayload = {
                sub: agency.id,
                id: agency.id,
                email: agency.mail,
                name_agency: agency.name_agency
            }
            
            const token = this.jwtService.sign(userpayload)
            
            
            return {success: "Usuario logueado correctamente", token};
        }

        
        const user = await this.userDB.findOneBy({mail: log.mail});
        
        if (!user) {
            throw new BadRequestException("Mail o Contraseña incorrecta");
        };
        
        const isPassword = await bcrypt.compare(log.password, user.password);
        
        if (!isPassword) {
            throw new BadRequestException("Mail o Contraseña incorrecta");
        };
        
        const userpayload = {
            sub: user.id,
            id: user.id,
            email: user.mail,
            username: user.username
        }
        
        const token = this.jwtService.sign(userpayload)
        
        
        return {success: "Usuario logueado correctamente", token};
    }
}
