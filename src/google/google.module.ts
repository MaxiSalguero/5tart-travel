import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './google.strategy';
import { UserEntity } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AgencyEntity } from 'src/entities/agency.entity';
import { GoogleService } from './google.service';
import { GoogleAuthErrorMiddleware } from 'src/middlewares/google';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AgencyEntity]), AuthModule],
  controllers: [GoogleController],
  providers: [GoogleStrategy, GoogleService],
})
export class GoogleModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GoogleAuthErrorMiddleware).forRoutes('google/redirect');
  }
}
