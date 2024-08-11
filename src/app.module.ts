import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TourModule } from './tour/tour.module';
import { UserModule } from './user/user.module';
import { MapsModule } from './maps/maps.module';
import { MailsModule } from './mails/mails.module';
import { AgencyModule } from './agency/agency.module';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { PreloadService } from './app.PreloadService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourEntity } from './entities/tour.entity';
import { AgencyEntity } from './entities/agency.entity';
import { JwtModule } from '@nestjs/jwt';
import { MapsService } from './maps/maps.service';
import { FilterModule } from './filter/filter.module';
import { FileUploadModule } from './file_upload/file_upload.module';
import { jwtConfig } from './config/jwt.config';
import { GoogleModule } from './google/google.module';
import { SearchModule } from './search/search.module';
import { MercadoPagoModule } from './mercado-pago/mercado-pago.module';
import { CommentModule } from './comment/comment.module';
import { ContactModule } from './contact/contact.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TourEntity, AgencyEntity]),
    databaseConfig,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TourModule,
    UserModule,
    MapsModule,
    MailsModule,
    AgencyModule,
    AuthModule,
    FilterModule,
    JwtModule.register(jwtConfig),
    FileUploadModule,
    GoogleModule,
    SearchModule,
    MercadoPagoModule,
    CommentModule,
    ContactModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, PreloadService, MapsService],
})
export class AppModule {}
