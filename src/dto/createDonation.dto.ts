import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateDonationDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '100',
  })
  amount: number;
}
