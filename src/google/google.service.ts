import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { FRONT_URL } from 'src/config/envs';

@Injectable()
export class GoogleService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) {}

  async handleNewUser(user: any, res: any): Promise<any> {
    const hashedPassword = await bcrypt.hash(user.email, 10);

    const newUser = new UserEntity();
    newUser.username = user.firstName;
    newUser.mail = user.email;
    newUser.password = hashedPassword;

    try {
      await this.userRepository.save(newUser);
      return this.loginAndRedirect(user.email, res);
    } catch (error) {
      throw new BadRequestException('Error creando la cuenta del usuario');
    }
  }

  async handleExistingUser(email: string, res: any): Promise<any> {
    return this.loginAndRedirect(email, res);
  }

  async loginAndRedirect(email: string, res: any): Promise<any> {
    const redirectBaseUrl = `${FRONT_URL}/AUTH`;
    try {
      const response = await this.authService.login(email, email);
      const access_token = response.token;
      return res.redirect(
        `${redirectBaseUrl}/callback?access_token=${access_token}`,
      );
    } catch (error) {
      throw new UnauthorizedException('Credenciales invalidas');
    }
  }
}
