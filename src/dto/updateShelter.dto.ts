import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, Matches } from "class-validator"

export class UpdateShelterDto{

    @IsOptional()
    @IsString()
    @ApiProperty({
        example: "Oscar"
    })
    name?: string


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
    @IsNumber()
    @ApiProperty({
        description: "Debe ser un Numero de DNI",
        example: "44654321"
    })
    dni?: number


    @IsOptional()
    @IsNumber()
    @ApiProperty({
        description: "Debe ser un numero de telefono",
        example: "1133445566"
    })    
    phone?: number


    @IsOptional()
    @IsString()
    @ApiProperty({
        example: "Refugio"
    })
    shelter_name?: string


    @IsOptional()
    @IsString()
    @ApiProperty({
        example: "Ubicacion"
    })
    location?: string


    @IsOptional()
    @IsString()
    @ApiProperty({
        example: "..."
    })
    description?: string


    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    exotic_animals?: boolean
}