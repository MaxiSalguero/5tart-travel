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

export class LogDto {


  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'Debe ser un Email',
    example: 'example@gmail.com',
  })
  mail: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Contraceña existente',
    example: 'Juank132.'
  })
  password: string;

}
