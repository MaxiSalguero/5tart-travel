import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SerchModule } from './serch/serch.module';
import { UsersModule } from './users/users.module';
import { SheltersModule } from './shelters/shelters.module';
// import { DonationModule } from './donations/donation.module';
import { AdoptionModule } from './adoptions/adoption.module';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';
import { databaseConfig } from './config/database.config';
import { FileUploadModule } from './file_upload/file_upload.module';
import { MailModule } from './mails/mail.module';
import { ConfigModule } from '@nestjs/config';
import { GoogleModule } from './google/google.module';
import { FacebookModule } from './facebook/facebook.module';
import { PreloadService } from './app.PreloadService';
import { ShelterEntity } from './entidades/shelter.entity';
import { PetsEntity } from './entidades/pets.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MercadoPagoModule } from './mercado-pago/mercado-pago.module';
import { CarritoModule } from './carrito/carrito.module';
import { ChatModule } from './chat/chat.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([ShelterEntity, PetsEntity]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    databaseConfig,
    FacebookModule,
    GoogleModule,
    SerchModule,
    UsersModule,
    SheltersModule,
    AdoptionModule,
    AuthModule,
    PetsModule,
    ChatModule,
    FileUploadModule,
    MailModule,
    MercadoPagoModule,
    CarritoModule,
  ],
  controllers: [AppController],
  providers: [AppService, PreloadService],
})
export class AppModule {}
