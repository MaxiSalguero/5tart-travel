import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository){}
    
    createUser(user) {
        const password = user.password

        if (password != user.confirm_password) {
            throw new BadRequestException('La contraseña no coincide')
        }

        return this.userRepository.createUser(user)
    }
}
