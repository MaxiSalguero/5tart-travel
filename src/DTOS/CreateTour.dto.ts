import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmpty,
  IsNumber,
  IsOptional,
  Length,
  isNotEmpty,
} from 'class-validator';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { TransportType } from 'src/entities/transporte.enum';

export class CreateTourDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  @Matches(/^[a-zA-Z ]+$/, {
    message: 'El Titulo solo puede contener letras y espacios',
  })
  @ApiProperty({
    example: 'Titulo',
  })
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 100,
  })
  price: Number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  @ApiProperty({
    example: '...',
  })
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'colocar una imagen',
  })
  imgUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Nombre de hotel',
  })
  hotel?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  address: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  destino: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  fecha_ingreso: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  fecha_egreso: Date;

  @IsOptional()
  @IsString()
  @ApiProperty()
  salida: string;

  @IsOptional()
  oferta: boolean;

  @ApiProperty()
  @IsNotEmpty()
  transportType: TransportType.BUS | TransportType.PLANE;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Nombre de empresa',
  })
  empresa?: string;
}
