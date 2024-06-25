// maps.service.ts

import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MapsService {
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

      console.log('Request URL:', response.config.url);
      console.log('Request Params:', response.config.params);
      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);

      if (response.status !== 200) {
        throw new HttpException(`Request failed with status code ${response.status}`, response.status);
      }

      const data = response.data;
      if (!data || data.length === 0) {
        throw new NotFoundException('No se encontraron resultados para la dirección especificada');
      }

      const location = data[0];
      const { lat, lon, display_name, address: { country, city, state } } = location;

      return {
        lat: lat,
        lon: lon,
        display_name: display_name,
        country: country,
        city: city,
        state: state
      };
    } catch (error) {
      console.error('Error geocoding address:', error.message);
      throw new HttpException(`Error al geocodificar la dirección: ${error.message}`, error.response?.status || 500);
    }
  }
}
