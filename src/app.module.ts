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

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
