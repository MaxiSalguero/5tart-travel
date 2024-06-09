import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isNotEmpty,
} from 'class-validator';
import { petSize } from './helpers/pet_size.enum';
import { petGender } from 'src/entidades/helpers/petGender.enum';

export class CreatePetsDto {
  @IsNotEmpty()
  @IsString()
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
  @IsNumber()
  @ApiProperty({
    example: '2',
  })
  month: number;

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

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Descripción del producto',
    example: '...',
  })
  description?: string;

  @IsEmpty()
  godfather?: string | undefined;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  isCondition: boolean;
}
