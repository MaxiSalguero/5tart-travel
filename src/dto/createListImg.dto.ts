import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import {ArrayMinSize, IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator"
import { ImgDto } from "./imgList.dto"

export class CreateListImgDto {
    @ApiProperty({
        description: 'Se espera como minimo una imagen',
        example: `[ { "imgUrl": "string" }, { "imgUrl": "string" } ]`
      })
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => ImgDto)
    listImg: ImgDto[]

}