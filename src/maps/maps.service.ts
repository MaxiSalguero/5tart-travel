import { HttpException, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { puntosTuristicos } from './puntosturisticos';
import { regiones } from './regiones';

export class MapsService {
  private determineRegion(lat: number, lon: number): string {
    for (const [region, bounds] of Object.entries(regiones)) {
      for (const bound of bounds) {
        if (lat >= bound.latMin && lat <= bound.latMax && lon >= bound.lonMin && lon <= bound.lonMax) {
          return region;
        }
      }
    }
    return 'Unknown';
  }

  private getTouristPoints(region: string, state: string): any[] {
    return puntosTuristicos[region]?.[state] || [];
  }

  async geocodeAddress(address: string): Promise<any> {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address,
          format: 'json',
          addressdetails: 1,
          limit: 1,
        },
        headers: {
          'User-Agent': 'cincotravel/5.0 (contact@cincotravel.com)',
        },
      });
      if (response.status !== 200) {
        throw new HttpException(`Request failed with status code ${response.status}`, response.status);
      }

      const data = response.data;
      if (!data || data.length === 0) {
        throw new NotFoundException('No se encontraron resultados para la dirección especificada');
      }

      const location = data[0];
      const { lat, lon, display_name, address: { country, state } } = location;

      const region = this.determineRegion(parseFloat(lat), parseFloat(lon));
      const touristPoints = this.getTouristPoints(region, state);

      return {
        lat: lat,
        lon: lon,
        display_name: display_name,
        country: country,
        region: region,
        state: state,
        touristPoints: touristPoints
      };
    } catch (error) {
      console.error('Error geocoding address:', error.message);
      throw new HttpException(`Error al geocodificar la dirección: ${error.message}`, error.response?.status || 500);
    }
  }
}