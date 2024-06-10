import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNumber, IsOptional, IsString, Length, Matches } from "class-validator"

export class UpdateUserDto{

    @IsOptional()
    @IsString()
    @Length(2,30)
    @Matches(/^[a-zA-Z ]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
    })
    @ApiProperty({
    example: 'Juan Carlos',
    })
    name?: string


    @IsOptional()
    @IsString()
    @Length(2,30)
    @Matches(/^[a-zA-Z ]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
    })
    @ApiProperty({
    example: 'Juan Carlos',
    })
    last_name?: string


    @IsOptional()
    @IsString()
    @IsEmail()
    @ApiProperty({
        description: "Debe ser un Email",
        example: "example@gmail.com"
    })
    email?: string


    @IsOptional()
    @IsString()
    @ApiProperty({
        example: "********"
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&.*])/, {
        message: "Debe contener al menos una letra minúscula, una letra mayúscula, un número y un caracter especial"
    })
    password?: string


    @IsOptional()
    @IsString()
    @ApiProperty()
    birthday?: string


    @IsOptional()
    @IsNumber()
    @Length(10)
    @ApiProperty({
        description: "Debe ser un numero de telefono",
        example: "11 3344-5566"
    })
    phone?: number


    @IsOptional()
    @IsString()
    @ApiProperty()
    location?: string 

    @IsOptional()
    @IsString()
    @ApiProperty({
      example: 'colocar una imagen'
    })
    imgUrl?: string;
}