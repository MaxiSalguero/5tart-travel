import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmpty, Length } from 'class-validator';
import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/password.decorator';

export class CreateUserDto {
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
  @Length(2, 30)
  @Matches(/^[a-zA-Z ]+$/, {
    message: 'El apellido solo puede contener letras y espacios',
  })
  @ApiProperty({
    example: 'Castillo',
  })
  last_name: string;

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
  @IsString()
  @Validate(MatchPassword, ['password'])
  @ApiProperty({
    description: 'Repetir la password',
    example: '...',
  })
  confirm_password: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  birthdate: Date;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'Debe ser un numero de telefono',
    example: 1133445566,
  })
  phone?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'colocar una imagen',
  })
  imgUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  location?: string;

  @IsEmpty()
  isActive: boolean;
}
