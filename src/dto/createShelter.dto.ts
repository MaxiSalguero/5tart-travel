import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateShelterDto {
  
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  @Matches(/^[a-zA-Z ]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  @ApiProperty({
    example: 'Juan Carlos',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'Debe ser un Email',
    example: 'example@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(4,50)
  @ApiProperty({
    example: '********',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&.*])/, {
    message:
      'Debe contener al menos una letra minúscula, una letra mayúscula, un número y un caracter especial',
  })
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Debe ser un Numero de DNI/CUIL',
    example: '44654321',
  })
  dni: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'Debe ser un numero de telefono',
    example: 1133445567,
  })
  phone: number;

  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  @Matches(/^[a-zA-Z ]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  @ApiProperty({
    example: 'Refugio Piola',
  })
  shelter_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Ubicacion',
  })
  location: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Ubicacion',
  })
  zona: string;

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
    example: 'colocar url de la imagen',
  })
  imgUrl: string;

  @IsEmpty()
  exotic_animals: boolean;

  @IsEmpty()
  isActive: boolean;

  @IsEmpty()
  rate: number;
}
