import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateContactDto{

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    username: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    message: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    mail?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    telefono?: string;
    
}