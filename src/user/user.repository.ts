import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>){}
    
    async getUsers(){
        const users: UserEntity[] = await this.usersRepository.find()
        
        if (users.length == 0) {
            return 'No hay usuarios en la base de datos'
        }
        
        return users;
    }
    
    async createUser(user) {
        const ExistUser: UserEntity = await this.usersRepository.findOne({where: {mail: user.mail}});
        
        if (ExistUser) {
            throw new BadRequestException('El mail ingresado ya esta registrado')
        }

        const newUser = this.usersRepository.create({...user});
        await this.usersRepository.save(newUser)

        return 'Usuario Creado'
    }

}