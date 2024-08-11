import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Length, Validate } from 'class-validator';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/password.decorator';

export class CreateUserDto {
  /**
  Ingresar el nombre de usuario
  @example "Juan Carlos"
  */
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  username: string;

  /**
  Ingresar el email de usuario
  @example example@gmail.com
  */
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Debe ser un Email',
    example: 'example@gmail.com',
  })
  mail: string;

  /**
  Ingresar el password
  @example Example123!
  */
  @IsNotEmpty()
  @IsString()
  @Length(5, 30)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&.*])/, {
    message:
      'Debe contener al menos una letra minúscula, una letra mayúscula, un número y un caracter especial',
  })
  password: string;

  /**
  Ingresar la confirmacion del password
  @example Example123!
  */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirm_password: string;

  /**
  Ingresar la fecha de nacimiento
  @example 10-01-2001
  */
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  birthday: Date;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class LoginDto extends PickType(CreateUserDto, ['mail', 'password']) {}
