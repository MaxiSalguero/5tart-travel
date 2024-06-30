import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, Length, Validate } from 'class-validator';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { MatchPassword } from 'src/decorators/password.decorator';

export class CreateAgencyDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  @Matches(/^[a-zA-Z ]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  @ApiProperty({
    example: 'Juan Carlos',
  })
  name_agency: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Debe ser un Email',
    example: 'example@gmail.com',
  })
  mail: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
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
    example: '********',
  })
  confirm_password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Direccion real de la agencia',
    example: 'Av. Victorica 598, Moreno',
  })
  address: string;

  @IsEmpty()
  imgUrl: string;
}
