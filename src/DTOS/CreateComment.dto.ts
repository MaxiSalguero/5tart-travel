import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCommentDto{

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    username: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    good?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    bad?: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    rate?: number;
    
}