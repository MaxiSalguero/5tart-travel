import { IsNotEmpty, IsString, IsUUID, Length, Matches } from 'class-validator';

export class ChangePasswordDto {
  /**
  Id del usuario
  @example "48bc917a-7bef-403c-969e-b0d1274b52af"
  */
  @IsNotEmpty()
  @IsUUID()
  id: string;

  /**
  Tipo de usuario 
  @example "agency | user"
  */
  @IsNotEmpty()
  @IsString()
  type: string;

  /**
  Ingresar la nueva contraseña
  @example NuevaContra123!
  */
  @IsNotEmpty()
  @IsString()
  @Length(5, 30)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&.*])/, {
    message:
      'Debe contener al menos una letra minúscula, una letra mayúscula, un número y un caracter especial',
  })
  newPassword: string;
}
