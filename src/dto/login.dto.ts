import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString} from "class-validator"

export class LoginDto{
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
        description: "La password, debe tener como minimo 8 caracteres y 15 como maximo",
        example: "********"
    })
    password: string
}