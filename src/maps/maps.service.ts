import { HttpException, NotFoundException } from '@nestjs/common';
import axios from 'axios';

const regiones = {
  'Litoral': [
    { latMin: -28, latMax: -22, lonMin: -61, lonMax: -57 },  // Formosa
    { latMin: -28, latMax: -22, lonMin: -63, lonMax: -57 },  // Chaco
    { latMin: -28, latMax: -22, lonMin: -56, lonMax: -54 },  // Misiones
    { latMin: -29, latMax: -28, lonMin: -61, lonMax: -57 },  // Corrientes
    { latMin: -34, latMax: -28, lonMin: -65, lonMax: -57 },  // Santa Fe
    { latMin: -34, latMax: -28, lonMin: -65, lonMax: -57 }   // Entre Ríos
  ],
  'Noroeste': [
    { latMin: -27, latMax: -23, lonMin: -67, lonMax: -63 },  // Jujuy
    { latMin: -27, latMax: -22, lonMin: -68, lonMax: -64 },  // Salta
    { latMin: -28, latMax: -27, lonMin: -68, lonMax: -64 },  // Catamarca
    { latMin: -31, latMax: -28, lonMin: -68, lonMax: -64 },  // La Rioja
    { latMin: -28, latMax: -26, lonMin: -67, lonMax: -64 },  // Tucumán
    { latMin: -29, latMax: -27, lonMin: -65, lonMax: -63 }   // Santiago del Estero
  ],
  'Cuyo': [
    { latMin: -35, latMax: -28, lonMin: -70, lonMax: -65 },  // San Juan
    { latMin: -36, latMax: -31, lonMin: -71, lonMax: -66 },  // Mendoza
    { latMin: -36, latMax: -32, lonMin: -68, lonMax: -65 }   // San Luis
  ],
  'Patagonia': [
    { latMin: -42, latMax: -36, lonMin: -73, lonMax: -65 },  // Neuquén
    { latMin: -42, latMax: -38, lonMin: -70, lonMax: -62 },  // Río Negro
    { latMin: -46, latMax: -41, lonMin: -74, lonMax: -65 },  // Chubut
    { latMin: -51, latMax: -45, lonMin: -74, lonMax: -62 }   // Santa Cruz
  ],
  'Extremo austral': [
    { latMin: -55, latMax: -50, lonMin: -75, lonMax: -60 }   // Tierra del Fuego, Antártida e Islas del Atlántico Sur
  ],
  'Pampeana': [
    { latMin: -41, latMax: -32, lonMin: -64, lonMax: -57 },  // Buenos Aires
    { latMin: -39, latMax: -33, lonMin: -66, lonMax: -61 },  // La Pampa
    { latMin: -34, latMax: -28, lonMin: -66, lonMax: -58 }   // Córdoba
  ]
};

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
      const { lat, lon, display_name, address: { country, state } } = location;

      const region = this.determineRegion(parseFloat(lat), parseFloat(lon));

      return {
        lat: lat,
        lon: lon,
        display_name: display_name,
        country: country,
        region: region,
        state: state
      };
    } catch (error) {
      console.error('Error geocoding address:', error.message);
      throw new HttpException(`Error al geocodificar la dirección: ${error.message}`, error.response?.status || 500);
    }
  }
}
