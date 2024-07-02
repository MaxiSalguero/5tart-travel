import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './google.strategy';
import { UserEntity } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [GoogleController],
  providers: [GoogleStrategy]
})
export class GoogleModule {}
