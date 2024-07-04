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
import { MapsService } from './maps/maps.service';
import { filterModule } from './filter/filter.module';
import { FileUploadModule } from './file_upload/file_upload.module';
import { jwtConfig } from './config/jwt.config';
import { GoogleModule } from './google/google.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TourEntity, AgencyEntity]),
    databaseConfig,
    ChatModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    tourModule,
    userModule,
    mapsModule,
    mailsModule,
    agencyModule,
    AuthModule,
    filterModule,
    JwtModule.register(jwtConfig),
    FileUploadModule,
    GoogleModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService, PreloadService, MapsService],
})
export class AppModule {}
