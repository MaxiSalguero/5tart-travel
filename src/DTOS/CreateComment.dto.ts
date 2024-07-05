import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { isBoxedPrimitive } from "util/types";

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
    @IsInt()
    @Min(1)
    @Max(5)
    @ApiProperty()
    rate?: number;
    
}