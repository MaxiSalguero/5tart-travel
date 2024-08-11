import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class FoundEmailDto {
  /**
  Debe ser un Email
  @example example@gmail.com
  */
  @IsNotEmpty()
  @IsEmail()
  mail: string;
}
