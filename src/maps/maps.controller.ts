import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { MapsService } from './maps.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("Maps")
@Controller('maps')
export class MapsController {
    constructor(private readonly mapsService: MapsService) { }

    @Post('geocode')
    async geocodeAddress(@Body() addressData: { address: string }) {
        console.log('Recibida solicitud para geocodificar dirección:', addressData.address);

        try {
            const geocodeData = await this.mapsService.geocodeAddress(addressData.address);
            return { message: 'Geocodificación actualizada correctamente.', ...geocodeData };
        } catch (error) {
            console.error('Error al geocodificar la dirección:', error);
            throw new NotFoundException(error.message);
        }
    }
}
