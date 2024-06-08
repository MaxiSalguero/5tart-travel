import { Module } from '@nestjs/common';
import { FileUploadController } from './file_upload.controller';
import { FileUploadService } from './file_upload.service';
import { CloudinaryConfig } from 'src/config/cloudinary.config';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryConfig]
})
export class FileUploadModule {}
