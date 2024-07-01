import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, Length } from 'class-validator';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { TransportType } from 'src/entities/transporte.enum';

export class CreateTourDto {
  /**
  Ingresar el titulo
  @example Titulo
  */
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'El Titulo solo puede contener letras y espacios',
  })
  title: string;

  /**
  Ingresar el precio
  @example 100
  */
  @IsNotEmpty()
  @IsNumber()
  price: Number;

  /**
  Ingresar la descripcion
  @example "Descripcion del paquete..."
  */
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  description: string;

  /**
  Ingresar la url de la imagen
  @example https://res.cloudinary.com/dia2gautk/image/upload/v1719807466/logo_start_hy9j22.webp
  */
  @IsOptional()
  @IsString()
  imgUrl?: string;

  /**
  Ingresar el nombre del hotel
  @example "Alejandro Primero"
  */
  @IsOptional()
  @IsString()
  @Length(5, 30)
  hotel?: string;

  /**
  Ingresar una direccion existente 
  @example "Av.San Martin 598, Salta" 
  */
  @IsNotEmpty()
  @IsString()
  @Length(5, 80)
  address: string;

  /**
  Ingresar el destino
  @example "Cataratas Iguazu"
  */
  @IsOptional()
  @IsString()
  @Length(4, 30)
  destino: string;

  /**
  Ingresar la fecha de ingreso
  @example "01-10-2024"
  */
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  fecha_ingreso: Date;

  /**
  Ingresar la fecha de egreso
  @example "12-10-2024"
  */
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fecha_egreso: Date;

  /**
  Ingresar lugar de salida
  @example "Buenos Aires"
  */
  @IsOptional()
  @IsString()
  @ApiProperty()
  salida: string;

  /**
  Ingresar si el paquete esta en oferta
  @example "true | false"
  */
  @IsOptional()
  oferta: boolean;

  /**
  Ingresar el medio de transporte
  @example "bus | plane"
  */
  @ApiProperty()
  @IsNotEmpty()
  transportType: TransportType.BUS | TransportType.PLANE;

  /**
  Ingresar el nombre de la empresa
  @example "Andesmar"
  */
  @IsOptional()
  @IsString()
  @Length(5, 30)
  empresa?: string;
}
