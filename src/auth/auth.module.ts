import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService, UserRepository],
  controllers: [AuthController]
})
export class AuthModule {}
