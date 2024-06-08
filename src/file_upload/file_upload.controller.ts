import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file_upload.service';
import { FileValidatorPipe } from './fileValidator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("files")
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile(FileValidatorPipe) file: Express.Multer.File) {
    const response = await this.fileUploadService.uploadFile(file);
    return response.secure_url
  }
}
