import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userModule } from './user/user.module';
import { tourModule } from './tour/tour.module';
import { mapsModule } from './maps/maps.module';
import { mailsModule } from './mails/mails.module';
import { agencyModule } from './agency/agency.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [userModule,tourModule,mapsModule,mailsModule,agencyModule,databaseConfig],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
