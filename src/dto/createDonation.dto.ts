import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateDonationDto {
  
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: "100"
  })
  amount: number


 
}