export const regiones = {
  Litoral: [
    { latMin: -28, latMax: -22, lonMin: -61, lonMax: -57 }, // Formosa
    { latMin: -28, latMax: -22, lonMin: -63, lonMax: -57 }, // Chaco
    { latMin: -28, latMax: -22, lonMin: -56, lonMax: -54 }, // Misiones
    { latMin: -29, latMax: -28, lonMin: -61, lonMax: -57 }, // Corrientes
    { latMin: -34, latMax: -28, lonMin: -65, lonMax: -57 }, // Santa Fe
    { latMin: -34, latMax: -28, lonMin: -65, lonMax: -57 }, // Entre Ríos
  ],
  Noroeste: [
    { latMin: -27, latMax: -23, lonMin: -67, lonMax: -63 }, // Jujuy
    { latMin: -27, latMax: -22, lonMin: -68, lonMax: -64 }, // Salta
    { latMin: -28, latMax: -27, lonMin: -68, lonMax: -64 }, // Catamarca
    { latMin: -31, latMax: -28, lonMin: -68, lonMax: -64 }, // La Rioja
    { latMin: -28, latMax: -26, lonMin: -67, lonMax: -64 }, // Tucumán
    { latMin: -29, latMax: -27, lonMin: -65, lonMax: -63 }, // Santiago del Estero
  ],
  Cuyo: [
    { latMin: -35, latMax: -28, lonMin: -70, lonMax: -65 }, // San Juan
    { latMin: -36, latMax: -31, lonMin: -71, lonMax: -66 }, // Mendoza
    { latMin: -36, latMax: -32, lonMin: -68, lonMax: -65 }, // San Luis
  ],
  Patagonica: [
    { latMin: -42, latMax: -36, lonMin: -73, lonMax: -65 }, // Neuquén
    { latMin: -42, latMax: -38, lonMin: -70, lonMax: -62 }, // Río Negro
    { latMin: -46, latMax: -41, lonMin: -74, lonMax: -65 }, // Chubut
    { latMin: -51, latMax: -45, lonMin: -74, lonMax: -62 }, // Santa Cruz
    { latMin: -55, latMax: -50, lonMin: -75, lonMax: -60 }, // Tierra del Fuego, Antártida e Islas del Atlántico Sur
  ],
  Pampeana: [
    { latMin: -41, latMax: -32, lonMin: -64, lonMax: -57 }, // Buenos Aires
    { latMin: -39, latMax: -33, lonMin: -66, lonMax: -61 }, // La Pampa
    { latMin: -35, latMax: -30, lonMin: -66, lonMax: -62 }, // Córdoba
  ],
  Internacional: [
    { latMin: -90, latMax: 12, lonMin: -180, lonMax: -33 }, // América del Norte y Centroamérica
    { latMin: 12, latMax: -55, lonMin: -118, lonMax: -33 }, // América del Sur excluyendo Argentina
    { latMin: 36, latMax: 72, lonMin: -15, lonMax: 39 }, // Europa
    { latMin: -90, latMax: 90, lonMin: -180, lonMax: 180 }, // Resto del mundo
    { lat: -5.732993, lon: 39.2939216 }, // Tanzania
    { latMin: 24.396308, latMax: 49.384358, lonMin: -125.0, lonMax: -66.93457 }, // Estados Unidos
    { latMin: 41.36, latMax: 51.124, lonMin: -5.142, lonMax: 9.662 }, // Francia
  ],
};
