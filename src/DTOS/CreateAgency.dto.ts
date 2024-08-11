import { IsOptional, Length, Validate } from 'class-validator';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { MatchPassword } from 'src/decorators/password.decorator';

export class CreateAgencyDto {
  /**
  Ingresar el nombre de la agencia
  @example Andesmar
  */
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  name_agency: string;

  /**
  Ingresar el email
  @example example@gmail.com
  */
  @IsNotEmpty()
  @IsEmail()
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
      'El password debe contener al menos una letra minúscula, una letra mayúscula, un número y un caracter especial',
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
  Ingresar la direccion de la agencia
  @example "Av.Belgrano 299, Salta"
  */
  @IsNotEmpty()
  @IsString()
  address: string;

  /**
  Ingresar la url de la imagen
  @example https://res.cloudinary.com/dia2gautk/image/upload/v1719807466/logo_start_hy9j22.webp
  */
  @IsOptional()
  @IsString()
  imgUrl: string;
}
