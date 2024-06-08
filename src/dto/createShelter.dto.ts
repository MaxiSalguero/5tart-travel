import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, isNotEmpty } from "class-validator"


export class CreateShelterDto {
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "Oscar"
    })
    name: string


    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({
        description: "Debe ser un Email",
        example: "example@gmail.com"
    })
    email: string


    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "********"
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&.*])/, {
        message: "Debe contener al menos una letra minúscula, una letra mayúscula, un número y un caracter especial"
    })
    password: string


    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "Debe ser un Numero de DNI",
        example: "44654321"
    })
    dni: number


    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "Debe ser un numero de telefono",
        example: "1133445566"
    })    
    phone: number

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "Refugio"
    })
    shelter_name: string


    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "Ubicacion"
    })
    location: string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "Ubicacion"
    })
    zona: string


    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "..."
    })
    description: string


    @IsOptional()
    @IsString()
    @ApiProperty({
        example: "colocar url de la imagen"
    })
    imgUrl: string


    @IsEmpty()
    exotic_animals: boolean

    @IsEmpty()
    isActive: boolean
}