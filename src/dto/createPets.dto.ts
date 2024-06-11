import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  isNotEmpty,
} from 'class-validator';
import { petSize } from './helpers/pet_size.enum';
import { petGender } from 'src/entidades/helpers/petGender.enum';

export class CreatePetsDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z ]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  @ApiProperty({
    description: 'Nombre de la mascota',
    example: 'Oscar',
  })
  name?: string | undefined;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nombre de la mascota',
    example: 'macho',
  })
  sexo: petGender.Hembra | petGender.Macho;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Perro',
  })
  breed: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '2',
  })
  age: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'año o mes',
  })
  month: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'medium',
  })
  pet_size: petSize.Big | petSize.Little | petSize.Medium;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Imagen del producto',
    example: 'img.jpg',
  })
  imgUrl?: string;

  @IsEmpty()
  listImg? : string[]

  @IsOptional()
  @IsString()
  @Length(2, 200)
  @ApiProperty({
    description: 'Descripción del producto',
    example: '...',
  })
  description?: string;

  @IsOptional()
  @IsString()
  species: string;

  @IsEmpty()
  godfather?: string | undefined;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  isCondition: boolean;
}
