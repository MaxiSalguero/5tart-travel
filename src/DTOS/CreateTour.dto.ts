import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmpty, IsNumber, IsOptional, Length } from 'class-validator';
import {
    IsNotEmpty,
    IsString,
    Matches,
} from 'class-validator';

export class CreateTourDto {

    @IsNotEmpty()
    @IsString()
    @Length(2, 30)
    @Matches(/^[a-zA-Z ]+$/, {
        message: 'El Titulo solo puede contener letras y espacios',
    })
    @ApiProperty({
        example: 'Titulo',
    })
    title: string;


    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: 100
    })
    price: Number;

    @IsNotEmpty()
    @IsString()
    @Length(1, 200)
    @ApiProperty({
        example: "..."
    })
    description: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        example: 'colocar una imagen'
    })
    imgUrl?: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    address: string;

}
