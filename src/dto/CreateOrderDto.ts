import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ShelterOrderDto } from './shelterOrderDto';

export class CreateOrderDto {
/*   @ApiProperty({
    description:
      'Se requiere que el userId no esté vacío y cumpla con el formato UUID.',
    example: 'UIID',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string; */

  @ApiProperty({
    description: 'Se espera como minimo Id de un refugio en formato UUID',
    example: `[ { "id": "UUID", "price": "number" }, { "id": "UUID", "price": "number" } ]`,
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ShelterOrderDto)
  shelters: ShelterOrderDto[];
}
