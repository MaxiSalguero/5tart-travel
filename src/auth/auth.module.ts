import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AgencyEntity } from 'src/entities/agency.entity';
import { AgencyRepository } from 'src/agency/agency.repository';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity, AgencyEntity])],
  providers: [AuthService, UserRepository, AgencyRepository],
  controllers: [AuthController]
})
export class AuthModule {}
