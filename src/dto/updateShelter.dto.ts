import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  isIn,
  isInt,
} from 'class-validator';

export class UpdateShelterDto {
  @IsOptional()
  @IsString()
  @Length(2, 30)
  @Matches(/^[a-zA-Z ]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  @ApiProperty({
    example: 'Juan Carlos',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'Debe ser un Email',
    example: 'example@gmail.com',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @Length(4,50)
  @ApiProperty({
    example: '********',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&.*])/, {
    message:
      'Debe contener al menos una letra minúscula, una letra mayúscula, un número y un caracter especial',
  })
  password?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Debe ser un Numero de DNI/CUIL',
    example: '44654321',
  })
  dni?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'Debe ser un numero de telefono',
    example: 1133445567,
  })
  phone?: number;

  @IsOptional()
  @IsString()
  @Length(2, 30)
  @Matches(/^[a-zA-Z ]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  @ApiProperty({
    example: 'Refugio Piola',
  })
  shelter_name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Ubicacion',
  })
  location?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Ubicacion',
  })
  zona: string;

  @IsOptional()
  @IsString()
  @Length(2, 200)
  @ApiProperty({
    example: '...',
  })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'colocar url de la imagen',
  })
  imgUrl: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  exotic_animals?: boolean;
}
