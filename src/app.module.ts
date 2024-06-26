import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { tourModule } from './tour/tour.module';
import { userModule } from './user/user.module';
import { mapsModule } from './maps/maps.module';
import { mailsModule } from './mails/mails.module';
import { agencyModule } from './agency/agency.module';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { PreloadService } from './app.PreloadService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourEntity } from './entities/tour.entity';
import { AgencyEntity } from './entities/agency.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([TourEntity,AgencyEntity]),
    databaseConfig,
    ChatModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    tourModule,
    userModule,
    mapsModule,
    mailsModule,
    agencyModule,
    AuthModule,
    JwtModule.register({
      global: true,
      signOptions: {expiresIn: "1h" },
      secret: process.env.JWT_SECRET,
      }),
  ],
  controllers: [AppController],
  providers: [AppService, PreloadService],
})
export class AppModule {}
