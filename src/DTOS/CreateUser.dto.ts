import { ApiProperty, PickType } from '@nestjs/swagger';
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
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  @Matches(/^[a-zA-Z ]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  @ApiProperty({
    example: 'Juan Carlos',
  })
  username: string;

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
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  birthday: Date;
}

export class LoginDto extends PickType(CreateUserDto, ['mail', 'password']) {}
