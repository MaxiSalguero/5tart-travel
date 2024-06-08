import {
    Injectable,
    PipeTransform,
    BadRequestException,
  } from '@nestjs/common';
  
  @Injectable()
  export class FileValidatorPipe implements PipeTransform {
    async transform(file: Express.Multer.File) {
      if (!file) {
        throw new BadRequestException('No se ha proporcionado ningún archivo');
      }
  
      const allowedFileTypes = ['jpg', 'jpeg', 'png', 'webp', 'gif','jfif' ,'svg'];
      if (!allowedFileTypes.includes(file.mimetype.split('/')[1])) {
        throw new BadRequestException('Tipo de archivo no válido');
      }
  
      const maxSize = 200000;
      if (file.size > maxSize) {
        throw new BadRequestException(
          'Tamaño de archivo excede el límite permitido de 200kb',
        );
      }
  
      const minSize = 10000;
      if (file.size < minSize) {
        throw new BadRequestException(
          'Tamaño de archivo insuficiente, seleccione un archivo mayor a 10 kb',
        );
      }
  
      return file;
    }
  }
  