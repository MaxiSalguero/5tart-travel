import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAgencyDto } from 'src/DTOS/CreateAgency.dto';
import { AgencyRepository } from 'src/agency/agency.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository,
                private agencyRepository: AgencyRepository
    ){}
    
    createUser(user) {
        const password = user.password

        if (password != user.confirm_password) {
            throw new BadRequestException('La contraseña no coincide')
        }

        return this.userRepository.createUser(user)
    }

    createAgency(agency) {
        const password = agency.password

        if (password != agency.confirm_password) {
            throw new BadRequestException('La contraseña no coincide')
        }

        return this.agencyRepository.createAgency(agency)
    }
}
