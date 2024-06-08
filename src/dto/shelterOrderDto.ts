import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class ShelterOrderDto {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
      description: 'Se requiere que el ID no esté vacío y cumpla con el formato UUID.'
    })
    id: string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
      description: "Se requiere que el price no esté vacío",
      example: `{ "price": number}`
    })
    price: number
  }