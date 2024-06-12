import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class ImgDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
      description: "Se requiere que el price no esté vacío",
      example: `{ "imgUrl": "string" }`
    })
    imgUrl: string
    
  }