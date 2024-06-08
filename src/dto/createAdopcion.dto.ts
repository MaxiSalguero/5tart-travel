import { ApiProperty } from "@nestjs/swagger"
import { IsEmpty, IsNotEmpty, IsUUID } from "class-validator"

export class CreateAdopcionDto{

    @IsEmpty()
    date: Date


    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        description: 'Se requiere que el userId no esté vacío y cumpla con el formato UUID.',
        example: "UIID"
      })
    user: string
    
    
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        description: 'Se requiere que el shelterId no esté vacío y cumpla con el formato UUID.',
        example: "UIID"
      })
    shelter: string
    

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        description: 'Se requiere que el petId no esté vacío y cumpla con el formato UUID.',
        example: "UIID"
      })
    pet: string

}