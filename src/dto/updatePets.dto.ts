import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { petSize } from './helpers/pet_size.enum';

export class UpdatePetsDto {
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
  @ApiProperty({
    example: 'Firulais',
  })
  breed?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 'Firulais',
  })
  age?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'mes o año',
  })
  month: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'medium',
  })
  pet_size?: petSize.Big | petSize.Little | petSize.Medium;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'MACHO O HEMBRA',
  })
  sexo: string;

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
    example: 'perro,gato o otros',
  })
  species: string;

  @IsOptional()
  @IsString()
  @Length(2, 200)
  @ApiProperty({
    description: 'Descripción del producto',
    example: '...',
  })
  description?: string;
}
