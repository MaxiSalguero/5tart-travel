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
    { latMin: -35, latMax: -30, lonMin: -66, lonMax: -62 }   // Córdoba
  ]
};

const puntosTuristicos = {
  'Litoral': {
    'Misiones': [
      { name: 'Puerto Iguazú', lat: -25.597, lon: -54.5735 },
      { name: 'Las Cataratas del Iguazú', lat: -25.6866, lon: -54.4406 },
      { name: 'Ruinas de San Ignacio', lat: -27.2567, lon: -55.5369 },
      { name: 'La Aripuca', lat: -25.6206, lon: -54.5101 },
      { name: 'Hito de las Tres Fronteras', lat: -25.5973, lon: -54.5824 },
      { name: 'Minas de Wanda', lat: -25.9747, lon: -54.5527 },
      { name: 'Salto Yocuma', lat: -26.4303, lon: -54.9367 },
      { name: 'Guira Oga', lat: -25.6862, lon: -54.5075 },
      { name: 'Parque Temático de la Cruz', lat: -27.3896, lon: -55.8945 }
    ], 'Entre Ríos': [
      { name: 'Palacio San José', lat: -32.4497, lon: -58.2493 },
      { name: 'Parque Nacional El Palmar', lat: -32.3447, lon: -58.2874 },
      { name: 'Termas de Federación', lat: -31.9823, lon: -57.9082 },
      { name: 'Termas de Colón', lat: -32.1788, lon: -58.1325 },
      { name: 'Ñandubaysal', lat: -32.1147, lon: -58.2185 },
      { name: 'Termas de Villa Elisa', lat: -32.1684, lon: -58.3469 }
    ], 'Corrientes': [
      { name: 'Esteros del Iberá', lat: -28.25, lon: -57.5 },
      { name: 'Parque Nacional Mburucuyá', lat: -28.0339, lon: -57.9 },
      { name: 'Puente Pexoa', lat: -27.3333, lon: -56.85 },
      { name: 'Represa Yacyretá', lat: -27.3833, lon: -56.8667 }
    ],
  },
  'Noroeste': {
    'Jujuy': [
      { name: 'Tilcara', lat: -23.5762, lon: -65.3923 },
      { name: 'Purmamarca', lat: -23.7442, lon: -65.4945 },
      { name: 'Salinas Grandes', lat: -23.6815, lon: -66.0381 },
      { name: 'Garganta del Diablo', lat: -23.5408, lon: -65.3978 },
      { name: 'Paleta del Pintor', lat: -23.7401, lon: -65.4939 },
      { name: 'Horconal', lat: -23.6658, lon: -65.6764 },
      { name: 'Parque Nacional Calilegua', lat: -23.7143, lon: -64.8122 },
      { name: 'Cuesta del Lipán', lat: -23.5473, lon: -65.4152 },
      { name: 'Cuevas de Wayra y Aguirre', lat: -23.6162, lon: -65.4354 },
      { name: 'Potrero de Yala', lat: -24.1238, lon: -65.3935 },
      { name: 'Paseo de los Colorados', lat: -23.8132, lon: -65.4644 },
      { name: 'Cerro de los Siete Colores', lat: -23.8074, lon: -65.4977 },
      { name: 'Maimará', lat: -23.6176, lon: -65.4126 },
      { name: 'El Porito', lat: -24.1652, lon: -65.3083 },
      { name: 'Termas de Reyes', lat: -24.1728, lon: -65.4016 },
      { name: 'Yala', lat: -24.1278, lon: -65.2922 },
      { name: 'Cerro de los 14 Colores', lat: -23.5973, lon: -65.4247 },
      { name: 'Termas del Río Jordan', lat: -24.2617, lon: -65.3625 },
      { name: 'Tres Cruces', lat: -22.9546, lon: -65.0873 },
      { name: 'Abra Pampa', lat: -22.7204, lon: -66.0383 },
      { name: 'Quebrada de las Señoritas', lat: -23.6728, lon: -65.4411 },
      { name: 'Uquía', lat: -23.8032, lon: -65.4731 },
      { name: 'Iruya', lat: -22.7811, lon: -65.3464 },
      { name: 'Huacalera', lat: -23.8705, lon: -65.3844 },
      { name: 'Susques', lat: -23.4167, lon: -66.4833 },
      { name: 'Abra de Abson Castro Tolay', lat: -23.8500, lon: -65.2667 },
      { name: 'Pucará de Tilcara', lat: -23.5775, lon: -65.3527 }
    ], 'Salta': [
      { name: 'Cerro San Bernardo', lat: -24.7906, lon: -65.4114 },
      { name: 'Museo de Arqueología de Alta Montaña', lat: -24.7863, lon: -65.4119 },
      { name: 'Catedral Basílica de Salta', lat: -24.7887, lon: -65.4121 },
      { name: 'Virgen de los Tres Cerritos', lat: -24.8425, lon: -65.4090 },
      { name: 'Teleférico San Bernardo', lat: -24.7869, lon: -65.4117 },
      { name: 'Parque Nacional Los Cardones', lat: -25.1828, lon: -66.0869 },
      { name: 'Monumento al General San Martín', lat: -24.7875, lon: -65.4133 },
      { name: 'Cuesta del Obispo', lat: -25.1417, lon: -65.9340 },
      { name: 'Quebrada de las Conchas', lat: -25.1250, lon: -66.0708 },
      { name: 'Cachi', lat: -25.1214, lon: -66.1656 },
      { name: 'Pasaje Quebrada de Escoipe', lat: -25.2589, lon: -65.9117 },
      { name: 'Cafayate', lat: -26.0705, lon: -65.9760 },
      { name: 'Piedra del Molino', lat: -25.3936, lon: -66.1898 },
      { name: 'Viaducto La Polvorilla', lat: -24.0704, lon: -66.4888 },
      { name: 'Quebrada del Toro', lat: -24.6022, lon: -65.8294 },
      { name: 'Salar de Arizaro', lat: -24.9897, lon: -67.7003 },
      { name: 'Tolar Grande', lat: -24.6937, lon: -67.5026 },
      { name: 'Volcán Llullaillaco', lat: -24.7211, lon: -68.5569 },
      { name: 'Ruinas de Tastil', lat: -24.5567, lon: -65.8572 },
      { name: 'Tren de las Nubes', lat: -24.2206, lon: -65.2986 },
      { name: 'Cuevas de Acsibi', lat: -22.2075, lon: -66.0553 },
      { name: 'Abra del Acay', lat: -24.5467, lon: -66.1033 },
      { name: 'Ojo de Cóndor', lat: -24.8322, lon: -66.2208 },
      { name: 'Camino del Pasado', lat: -24.7840, lon: -65.4106 },
      { name: 'Valle Encantado', lat: -24.9558, lon: -65.4245 }
    ], 'Tucumán': [
      { name: 'Ciudad Sagrada de los Quilmes', lat: -26.9614, lon: -66.6108 },
      { name: 'Museo Miguel Lillo de Ciencias Naturales', lat: -26.8185, lon: -65.2175 },
      { name: 'Museo Pachamama', lat: -26.7300, lon: -65.2654 },
      { name: 'Cascada Río Noque', lat: -26.9475, lon: -65.3860 },
      { name: 'El Cadillal', lat: -26.8032, lon: -65.1740 },
      { name: 'Parque Nacional Aconquija', lat: -27.1782, lon: -65.6187 },
      { name: 'Tafí del Valle', lat: -26.8521, lon: -65.7097 },
      { name: 'Abra del Infiernillo', lat: -27.1430, lon: -65.7396 },
      { name: 'Amaicha del Valle', lat: -27.0618, lon: -65.6853 },
      { name: 'Dique Escaba', lat: -27.2200, lon: -65.6591 },
      { name: 'Reserva Natural Aguas Chiquitas', lat: -27.1953, lon: -65.5720 }
    ],
    'Catamarca': [
      { name: 'Virgen del Valle', lat: -28.4690, lon: -65.7808 },
      { name: 'Dique El Jumeal', lat: -28.4836, lon: -65.7941 },
      { name: 'Pueblo Perdido de la Quebrada', lat: -27.7217, lon: -67.0613 },
      { name: 'Ruta Seismiles', lat: -27.7426, lon: -66.9934 },
      { name: 'Termas de Fiambalá', lat: -27.6865, lon: -67.6160 },
      { name: 'Tinogasta', lat: -28.0662, lon: -67.5646 }
    ], 'La Rioja': [
      { name: 'Parque Nacional Talampaya', lat: -29.3451, lon: -67.5016 },
      { name: 'Monumento al Chacho Peñaloza', lat: -29.4153, lon: -66.8502 },
      { name: 'Cristo del Portezuelo', lat: -29.3950, lon: -66.8658 },
      { name: 'Parque Nacional El Chiflón', lat: -30.6523, lon: -66.5043 },
      { name: 'Cuesta de Miranda', lat: -30.0600, lon: -67.8900 },
      { name: 'Castillo de Dionisio', lat: -29.1584, lon: -67.5774 },
      { name: 'Parque de los Dinosaurios', lat: -29.4782, lon: -67.7854 },
      { name: 'Mina La Mejicana', lat: -29.1733, lon: -67.5097 },
      { name: 'Cañón Arcoiris y Ciudad Perdida', lat: -28.7298, lon: -67.3953 },
      { name: 'Sitio Arqueológico del Hualco', lat: -28.7731, lon: -66.8977 },
      { name: 'Vallecito Encantado', lat: -29.2537, lon: -67.1081 },
      { name: 'Dique Los Sauces', lat: -29.4344, lon: -66.8677 }
    ], 'Santiago del Estero': [
      { name: 'Reserva Natural Tara Inti', lat: -27.7820, lon: -63.2527 },
      { name: 'Termas de Río Hondo', lat: -27.4960, lon: -64.8596 }
    ],
  },
  'Cuyo': {
    'San Juan': [
      { name: 'Parque Nacional El Leoncito', lat: -31.8000, lon: -69.3000 },
      { name: 'Parque Nacional Ischigualasto', lat: -30.1499, lon: -68.0127 },
      { name: 'Laguna Brava', lat: -28.6586, lon: -69.0033 },
      { name: 'Dique de Ullum', lat: -31.5375, lon: -68.6711 },
      { name: 'Parque Provincial El Chiflón', lat: -30.3498, lon: -67.0058 },
      { name: 'Parque Nacional Talampaya', lat: -29.7883, lon: -67.8512 },
      { name: 'La Cuesta de Huaco', lat: -30.1608, lon: -68.0384 },
      { name: 'Mina La Mexicana', lat: -29.1600, lon: -68.9000 },
      { name: 'Santuario Difunta Correa', lat: -31.5285, lon: -67.9456 },
      { name: 'Pampa del Leoncito', lat: -31.8000, lon: -69.3000 },
      { name: 'Parque de las Tinajas', lat: -31.7565, lon: -68.5976 },
      { name: 'Barreal Blanco', lat: -30.6850, lon: -69.3239 },
      { name: 'Paso de Agua Negra', lat: -30.5100, lon: -69.5472 },
      { name: 'Represa Punta Negra', lat: -31.5439, lon: -68.6761 },
      { name: 'Zonda', lat: -31.5737, lon: -68.5237 }
    ],

    'Mendoza': [
      { name: 'Parque Provincial Aconcagua', lat: -32.6532, lon: -69.9796 },
      { name: 'Cañon del Atuel', lat: -34.8923, lon: -68.5808 },
      { name: 'Potrerillos', lat: -32.9568, lon: -69.1459 },
      { name: 'Cerro de la Gloria', lat: -32.8897, lon: -68.8584 },
      { name: 'Dique Los Reyunos', lat: -34.7464, lon: -68.5425 },
      { name: 'Reserva La Payunia', lat: -36.3306, lon: -68.3438 },
      { name: 'La Caverna de las Brujas Malargüe', lat: -36.7425, lon: -69.9755 },
      { name: 'Puente del Inca', lat: -32.8236, lon: -69.9275 },
      { name: 'Valle de Uco', lat: -33.6071, lon: -69.2052 },
      { name: 'Reserva Natural Villavicencio', lat: -32.5820, lon: -69.0403 },
      { name: 'Termas de Cacheuta', lat: -32.9662, lon: -69.1374 },
      { name: 'Salinas del Diamante', lat: -35.0303, lon: -68.8504 },
      { name: 'Pozo de las Ánimas', lat: -36.0147, lon: -69.6966 },
      { name: 'Laguna Diamante', lat: -34.0516, lon: -69.7886 },
      { name: 'Castillos de Pincheira', lat: -35.9853, lon: -69.6864 },
      { name: 'Minas de Paramillos', lat: -32.5764, lon: -69.0713 },
      { name: 'Cascada Maqui Malal', lat: -36.1203, lon: -69.5153 },
      { name: 'Volcán Malacara', lat: -36.2920, lon: -69.6750 },
      { name: 'Las Leñas', lat: -35.1308, lon: -70.0064 },
      { name: 'Cristo Redentor de los Andes', lat: -32.8194, lon: -69.9272 },
      { name: 'Reserva El Manzano Histórico', lat: -33.7320, lon: -69.0204 },
      { name: 'Penitentes', lat: -32.8296, lon: -69.9076 },
      { name: 'Laguna de la Niña Encantada', lat: -36.0781, lon: -69.7994 },
      { name: 'Valle Hermoso', lat: -35.1406, lon: -69.9641 },
      { name: 'Bodega La Rural', lat: -33.0547, lon: -68.8485 },
      { name: 'Bodega Catena Zapata', lat: -33.2228, lon: -68.8848 },
      { name: 'Parque General San Martín', lat: -32.8906, lon: -68.8726 },
      // Añade más puntos turísticos de Mendoza aquí
    ],
    'San Luis': [
      { name: 'Mirador del Sol', lat: -32.3618, lon: -65.0135 },
      { name: 'Pasos Malos', lat: -32.3618, lon: -65.0135 },
      { name: 'Merlo San Luis', lat: -32.3409, lon: -65.0107 },
      { name: 'Dique Piscu Yaco', lat: -32.5362, lon: -65.0111 },
      { name: 'Salto Tabaquillo', lat: -32.6819, lon: -64.9687 },
      { name: 'Potrero de los Funes', lat: -33.2995, lon: -66.1942 },
      { name: 'Mina Los Cóndores', lat: -32.7520, lon: -66.2221 },
      { name: 'Salto de la Moneda', lat: -33.3303, lon: -65.0261 },
      { name: 'Río El Trapiche', lat: -33.0575, lon: -66.0393 },
      { name: 'Dique La Florida', lat: -33.1364, lon: -66.1533 },
      { name: 'Ciudad de La Punta', lat: -33.1834, lon: -66.3133 },
      { name: 'Parque Astronómico de La Punta', lat: -33.1906, lon: -66.3056 },
      { name: 'Parque Nacional Sierra de las Quijadas', lat: -32.3558, lon: -67.2252 },
      { name: 'Laguna de la Niña Encantada', lat: -36.0781, lon: -69.7994 },
      { name: 'Parque Nacional Quebrada del Condorito', lat: -31.4965, lon: -64.7946 },    ]
  },

  'Patagonia': {
    'Santa Cruz': [
      { name: 'Parque Nacional Los Glaciares', lat: -50.4833, lon: -73.05 },
      { name: 'Laguna de los Tres', lat: -49.2733, lon: -73.0347 },
      { name: 'Glaciar Perito Moreno', lat: -50.4967, lon: -73.0333 },
      { name: 'Cueva de las Manos', lat: -47.1083, lon: -70.6667 },
      { name: 'Glaciar Huemul', lat: -49.8483, lon: -72.9733 },
      { name: 'Laguna Capri', lat: -49.2928, lon: -73.0572 },
      { name: 'Laguna Latorre', lat: -50.1522, lon: -73.2214 },
      { name: 'Monte Fitz Roy', lat: -49.3317, lon: -73.0472 },
      { name: 'Lago Argentino', lat: -50.3392, lon: -72.2642 },
      { name: 'Glaciar Upsala', lat: -50.9808, lon: -73.4236 },
      { name: 'Punta Walichu', lat: -50.3294, lon: -72.2858 },
      { name: 'El Chaltén', lat: -49.3317, lon: -72.8867 },
      { name: 'Parque Nacional Bosques Petrificados de Jaramillo', lat: -48.3606, lon: -67.7161 },
      { name: 'El Calafate', lat: -50.3408, lon: -72.2761 },
      { name: 'Chorrillo del Salto', lat: -50.1247, lon: -72.7256 },
      { name: 'Mirador de las Águilas', lat: -50.4083, lon: -72.5858 },
      { name: 'Faro Cabo Vírgenes', lat: -52.3525, lon: -68.2833 },
      { name: 'Mirador de Darwin', lat: -50.1083, lon: -68.5614 },
      { name: 'Los Antiguos', lat: -46.5333, lon: -71.6167 },
      { name: 'Reserva Laguna Nimez', lat: -50.3422, lon: -72.2875 },
      { name: 'Parque Nacional Monte León', lat: -50.9519, lon: -68.8250 },
      { name: 'Lago del Desierto', lat: -49.1528, lon: -73.1000 },
      { name: 'Ventisquero Viedma', lat: -49.4261, lon: -72.9408 },
      { name: 'Punta Loyola', lat: -51.6544, lon: -69.2958 },
      { name: 'Río de las Vueltas', lat: -49.3317, lon: -72.8867 },
      { name: 'Monte Zeballos', lat: -49.3619, lon: -72.6389 },
      { name: 'Loma del Pliegue Tumbado', lat: -49.3244, lon: -73.0017 },
      { name: 'Parque Nacional Patagonia', lat: -47.6833, lon: -71.9167 }
    ], 'Chubut': [
      { name: 'Parque Nacional Los Alerces', lat: -42.8167, lon: -71.7833 },
      { name: 'Parque Nacional Lago Puelo', lat: -42.0444, lon: -71.6269 },
      { name: 'Ecocentro Pampa Azul', lat: -42.7672, lon: -65.0494 },
      { name: 'Reserva Lobería Punta Loma', lat: -42.7214, lon: -65.0394 },
      { name: 'Península Valdés', lat: -42.6333, lon: -64.2833 },
      { name: 'Playa La Cantera', lat: -42.7489, lon: -65.0458 },
      { name: 'Punta Tombo', lat: -44.0447, lon: -65.1847 },
      { name: 'Playa El Doradillo', lat: -42.6431, lon: -64.9453 },
      { name: 'La Trochita', lat: -42.9175, lon: -71.3114 },
      { name: 'Faro San Jorge', lat: -43.3297, lon: -65.0950 },
      { name: 'Puerto Madryn', lat: -42.7692, lon: -65.0389 },
      { name: 'Parque Paleontológico Bryn Gwyn', lat: -42.9747, lon: -65.0658 },
      { name: 'Mirador Punta Cuevas', lat: -42.7792, lon: -64.9303 },
      { name: 'Cerro Currumahuida', lat: -42.8333, lon: -71.3667 },
      { name: 'Esquel', lat: -42.9097, lon: -71.3194 },
      { name: 'Puerto Pirámides', lat: -42.5797, lon: -64.2869 },
      { name: 'Puerto Patriada', lat: -42.6472, lon: -71.2719 },
      { name: 'Trevelin', lat: -43.0897, lon: -71.4681 },
      { name: 'El Hoyo', lat: -42.0833, lon: -71.3833 },
      { name: 'Cholila', lat: -42.4714, lon: -71.5381 },
      { name: 'Epuyén', lat: -42.2222, lon: -71.6333 },
      { name: 'Gualjaina', lat: -42.6333, lon: -69.25 },
      { name: 'Corcovado', lat: -43.2833, lon: -71.1167 },
      { name: 'Lago Futalaufquen', lat: -42.9225, lon: -71.6503 },
      { name: 'Lago Epuyén', lat: -42.2111, lon: -71.6467 }
    ], 'Río Negro': [
      { name: 'Circuito Chico Bariloche', 'lat': -41.1164, 'lon': -71.3449 },
      { name: 'Puerto Pañuelo', 'lat': -41.0556, 'lon': -71.4306 },
      { name: 'El Bolsón', 'lat': -41.9603, 'lon': -71.5333 },
      { name: 'Villa La Angostura', 'lat': -40.7629, 'lon': -71.6456 },
      { name: 'Bahía López', 'lat': -41.0826, 'lon': -71.4442 },
      { name: 'Cerro Otto', 'lat': -41.1355, 'lon': -71.3018 },
      { name: 'Indio Comahue', 'lat': -41.1385, 'lon': -71.3121 },
      { name: 'Cerro Catedral', 'lat': -41.1698, 'lon': -71.4391 },
      { name: 'Colonia Suiza', 'lat': -41.0692, 'lon': -71.4798 },
      { name: 'Cerro Campanario', 'lat': -41.0918, 'lon': -71.4015 },
      { name: 'Las Grutas', 'lat': -40.8000, 'lon': -65.0833 },
      { name: 'Piedra de Hasburgo', 'lat': -41.9610, 'lon': -71.5296 },
      { name: 'Parque Nahuelito', 'lat': -41.0755, 'lon': -71.4742 },
      { name: 'Cajón del Azul', 'lat': -41.9833, 'lon': -71.5833 },
      { name: 'Cabeza del Indio', 'lat': -41.9652, 'lon': -71.5333 },
      { name: 'Llao Llao', 'lat': -41.0845, 'lon': -71.4313 },
      { name: 'Lago Mascardi', 'lat': -41.2846, 'lon': -71.5268 },
      { name: 'Abedules', 'lat': -40.7977, 'lon': -65.1010 },
      { name: 'Punta Perdices', 'lat': -40.8300, 'lon': -64.8264 },
      { name: 'Playa Las Conchitas', 'lat': -40.8178, 'lon': -65.1023 },
      { name: 'Cerro Tronador', 'lat': -41.1483, 'lon': -71.8922 },
      { name: 'Isla Victoria', 'lat': -40.9611, 'lon': -71.5172 },
      { name: 'Lago Gutiérrez', 'lat': -41.1867, 'lon': -71.3856 },
      { name: 'Cerro León', 'lat': -41.2153, 'lon': -71.4160 },
      { name: 'Puerto Blest', 'lat': -41.0160, 'lon': -71.8164 },
      { name: 'Bosque de Arrayanes', 'lat': -40.8320, 'lon': -71.6330 },
      { name: 'Camino de los 7 Lagos', 'lat': -40.7057, 'lon': -71.6142 },
      { name: 'San Martín de los Andes', 'lat': -40.1573, 'lon': -71.3533 }
    ],
    'Neuquén': [
      { name: 'Río Limay', 'lat': -39.0433, 'lon': -68.3667 },
      { name: 'Represa El Chocón', 'lat': -39.2700, 'lon': -68.7647 }
    ],

    'Extremo austral': [
      { name: 'Parque Nacional Tierra del Fuego', 'lat': -54.2514, 'lon': -68.6058 },
      { name: 'Cerro Castor', 'lat': -54.7359, 'lon': -68.0638 },
      { name: 'Ushuaia', 'lat': -54.8019, 'lon': -68.3029 },
      { name: 'Bahía Lapataia', 'lat': -54.8531, 'lon': -68.5683 },
      { name: 'Islas Malvinas', 'lat': -51.7963, 'lon': -59.5236 },
      { name: 'Glaciar Vinciguerra', 'lat': -54.7550, 'lon': -68.3643 },
      { name: 'Laguna Esmeralda', 'lat': -54.7983, 'lon': -68.2353 },
      { name: 'Monte Martial', 'lat': -54.7639, 'lon': -68.4097 },
      { name: 'Canal de Beagle', 'lat': -54.8584, 'lon': -68.2056 },
      { name: 'Tren del Fin del Mundo', 'lat': -54.8066, 'lon': -68.3615 },
      { name: 'Cárcel del Fin del Mundo', 'lat': -54.8108, 'lon': -68.3275 },
      { name: 'Isla Martillo', 'lat': -54.9218, 'lon': -67.3914 },
      { name: 'Cabo Domingo', 'lat': -53.7913, 'lon': -67.7485 },
      { name: 'Lago Fagnano', 'lat': -54.5319, 'lon': -67.9638 },
      { name: 'Faro San Juan de Salvamento', 'lat': -54.8717, 'lon': -66.7073 },
      { name: 'Cerro Alarken', 'lat': -54.7939, 'lon': -68.3056 },
      { name: 'Isla Hache', 'lat': -54.9231, 'lon': -67.3339 },
      { name: 'Reserva Punta Popper', 'lat': -53.7858, 'lon': -67.6989 },
      { name: 'Playa Larga', 'lat': -54.8153, 'lon': -68.2620 },
      { name: 'Tolhuin', 'lat': -54.5167, 'lon': -67.2000 },
      { name: 'Lago Escondido', 'lat': -54.6333, 'lon': -67.8667 },
      { name: 'Isla de los Pájaros', 'lat': -54.9167, 'lon': -67.6833 },
      { name: 'Cerro Alvear', 'lat': -54.7761, 'lon': -68.1394 },
      { name: 'Las Margaritas', 'lat': -54.7944, 'lon': -68.2633 },
      { name: 'Cerro Guanaco', 'lat': -54.2541, 'lon': -68.6412 },
      { name: 'Centro Invernal Tierra Mayor', 'lat': -54.7422, 'lon': -68.0794 },
      { name: 'Glaciar Ojo del Albino', 'lat': -54.7378, 'lon': -68.3328 },
      { name: 'Bahía Encerrada', 'lat': -54.8153, 'lon': -68.3136 },
      { name: 'Laguna de los Témpanos', 'lat': -54.7581, 'lon': -68.3328 },
      { name: 'Monte Olivia', 'lat': -54.7550, 'lon': -68.1233 },
      { name: 'Estrecho de Magallanes', 'lat': -52.6293, 'lon': -70.1653 }
    ],
  },
  'Pampeana': {
    'Buenos Aires': [
      { name: 'Obelisco', 'lat': -34.6037, 'lon': -58.3816 },
      { name: 'Jardín Japonés', 'lat': -34.5773, 'lon': -58.4164 },
      { name: 'Puerto Madero', 'lat': -34.6118, 'lon': -58.3626 },
      { name: 'La Casa Rosada', 'lat': -34.6081, 'lon': -58.3703 },
      { name: 'Palermo', 'lat': -34.5832, 'lon': -58.4207 },
      { name: 'San Telmo', 'lat': -34.6211, 'lon': -58.3734 },
      { name: 'Reserva Ecológica Costanera Sur', 'lat': -34.6173, 'lon': -58.3510 },
      { name: 'Caminito', 'lat': -34.6345, 'lon': -58.3632 },
      { name: 'Jardín Botánico', 'lat': -34.5805, 'lon': -58.4234 },
      { name: 'Planetario Galileo', 'lat': -34.5698, 'lon': -58.4118 },
      { name: 'Temaikèn', 'lat': -34.3939, 'lon': -58.7725 },
      { name: 'El Parque de la Costa', 'lat': -34.3937, 'lon': -58.5794 },
      { name: 'Monte Calvario', 'lat': -37.3236, 'lon': -59.1331 },
      { name: 'Parque del Origen', 'lat': -37.3244, 'lon': -59.1234 },
      { name: 'Dique del Fuerte', 'lat': -37.3205, 'lon': -59.1281 },
      { name: 'Cerro del Libertador', 'lat': -37.3250, 'lon': -59.1335 },
      { name: 'Paseo de los Pioneros', 'lat': -37.3286, 'lon': -59.1253 },
      { name: 'Piedra Movediza Tandil', 'lat': -37.3292, 'lon': -59.1371 },
      { name: 'Camino Misterioso', 'lat': -37.3300, 'lon': -59.1400 },
      { name: 'Cerro El Centinela', 'lat': -37.3367, 'lon': -59.1350 },
      { name: 'Reserva Natural Sierra del Tigre', 'lat': -37.3339, 'lon': -59.1453 },
      { name: 'Cerro de la Virgen', 'lat': -37.3417, 'lon': -59.1525 },
      { name: 'Valle del Picadero', 'lat': -37.3444, 'lon': -59.1533 },
      { name: 'Basílica de Luján', 'lat': -34.5481, 'lon': -59.1092 },
      { name: 'Torreón del Monje', 'lat': -38.0006, 'lon': -57.5392 },
      { name: 'Mar del Plata', 'lat': -38.0055, 'lon': -57.5426 },
      { name: 'Laguna de los Padres', 'lat': -37.9371, 'lon': -57.7560 },
      { name: 'Carlos Keen', 'lat': -34.6308, 'lon': -59.2978 },
      { name: 'Monumento a Vuelta de Obligado', 'lat': -34.1811, 'lon': -59.1853 },
      { name: 'Cerro Ventana', 'lat': -38.0806, 'lon': -62.0839 },
      { name: 'Sierra de la Ventana', 'lat': -38.1378, 'lon': -62.0858 },
      { name: 'Epecuén', 'lat': -37.1375, 'lon': -62.7872 },
      { name: 'Cerro Bahía Blanca', 'lat': -38.7208, 'lon': -62.2682 },
      { name: 'Cerro Tres Picos', 'lat': -38.2097, 'lon': -61.9700 }
    ],
    'La Pampa': [
      { name: 'Parque Nacional Lihué Calel', 'lat': -37.9500, 'lon': -65.5833 },
      { name: 'Laguna La Arocena', 'lat': -37.2371, 'lon': -66.5263 },
      { name: 'Bajo Giuliani', 'lat': -36.6167, 'lon': -64.2833 },
      { name: 'Reserva Natural Municipal Laguna de Utracán', 'lat': -37.3483, 'lon': -65.9139 },
      { name: 'Toay', 'lat': -36.6767, 'lon': -64.4336 },
      { name: 'Complejo Termal Guatraché', 'lat': -37.6717, 'lon': -63.5333 },
      { name: 'Casas de Piedra', 'lat': -38.1856, 'lon': -66.9514 },
      { name: 'Parque Pisaderos', 'lat': -37.2100, 'lon': -66.2700 }
    ],
    'Santa Fe': [
      { name: 'Monumento a la Bandera', 'lat': -32.9479, 'lon': -60.6307 },
      { name: 'Catedral de Santa Fe', 'lat': -31.6257, 'lon': -60.7012 },
      { name: 'Puente Colgante de Santa Fe', 'lat': -31.6459, 'lon': -60.7071 },
      { name: 'Estación Belgrano', 'lat': -31.6312, 'lon': -60.7031 },
      { name: 'Parque Arqueológico Ruinas de Santa Fe la Vieja', 'lat': -31.5386, 'lon': -60.2265 },
      { name: 'El Molino Fábrica Cultural', 'lat': -31.6318, 'lon': -60.6987 },
      { name: 'Reserva Ecológica Ciudad Universitaria', 'lat': -31.6282, 'lon': -60.7114 },
      { name: 'Museo Provincial de Bellas Artes Rosa Galisteo de Rodríguez', 'lat': -31.6289, 'lon': -60.7037 },
      { name: 'Museo Histórico Provincial Brigadier Estanislao López', 'lat': -31.6281, 'lon': -60.7007 }
    ],
    'Córdoba': [
      { name: 'Parque Nacional Quebrada del Condorito', 'lat': -31.5986, 'lon': -64.8656 },
      { name: 'Los Terrones', 'lat': -30.8717, 'lon': -64.6611 },
      { name: 'Dique San Roque', 'lat': -31.3480, 'lon': -64.4826 },
      { name: 'Uritorco', 'lat': -30.8494, 'lon': -64.4944 },
      { name: 'Camino de las Cien Curvas', 'lat': -31.3948, 'lon': -64.5261 },
      { name: 'Champaquí', 'lat': -32.0500, 'lon': -64.8325 },
      { name: 'Balneario Playas de Oro', 'lat': -31.4334, 'lon': -64.4974 },
      { name: 'Balneario Soy y Río', 'lat': -31.4230, 'lon': -64.4910 },
      { name: 'Apa Corral', 'lat': -32.2000, 'lon': -64.9833 },
      { name: 'Yacanto', 'lat': -32.1483, 'lon': -64.7125 },
      { name: 'Nono', 'lat': -31.7944, 'lon': -64.9761 },
      { name: 'Valle de Punilla', 'lat': -30.9236, 'lon': -64.4954 },
      { name: 'La Cumbrecita', 'lat': -31.8833, 'lon': -64.7728 },
      { name: 'Mina Clavero', 'lat': -31.7211, 'lon': -65.0034 },
      { name: 'Villa Carlos Paz', 'lat': -31.4241, 'lon': -64.4974 }
    ]
  }
}


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