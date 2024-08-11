import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file_upload.service';
import { FileValidatorPipe } from './fileValidator';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadFile')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivo a cargar',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile(FileValidatorPipe) file: Express.Multer.File) {
    const response = await this.fileUploadService.uploadFile(file);
    return response.secure_url;
  }
}
