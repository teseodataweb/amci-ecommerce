// Mock data for development when database is not available

export const mockCategories = [
  {
    id: '1',
    name: 'Cemento y Concreto',
    slug: 'cemento-concreto',
    description: 'Materiales de cemento y concreto premezclado'
  },
  {
    id: '2',
    name: 'Acero y Varilla',
    slug: 'acero-varilla',
    description: 'Productos de acero estructural y varillas'
  },
  {
    id: '3',
    name: 'Materiales Eléctricos',
    slug: 'materiales-electricos',
    description: 'Cables, tuberías y accesorios eléctricos'
  },
  {
    id: '4',
    name: 'Plomería y Tuberías',
    slug: 'plomeria-tuberias',
    description: 'Tuberías, conexiones y accesorios de plomería'
  },
  {
    id: '5',
    name: 'Herramientas',
    slug: 'herramientas',
    description: 'Herramientas manuales y eléctricas'
  }
];

export const mockProviders = [
  {
    id: '1',
    razon_social: 'Cementos Mexicanos S.A. de C.V.',
    nombre_comercial: 'CEMEX',
    descripcion: 'Líder global en la industria de materiales para construcción. Con más de 100 años de experiencia, ofrecemos productos de la más alta calidad.',
    años_experiencia: 115,
    rating: 4.8,
    total_ventas: 12543,
    tiempo_respuesta: '2-4 horas',
    ubicacion: 'Monterrey, Nuevo León',
    certificaciones: ['ISO 9001', 'ISO 14001', 'NOM-127']
  },
  {
    id: '2',
    razon_social: 'Aceros del Norte S.A. de C.V.',
    nombre_comercial: 'AceroNorte',
    descripcion: 'Especialistas en acero estructural y productos derivados. Más de 30 años sirviendo a la industria de la construcción.',
    años_experiencia: 32,
    rating: 4.6,
    total_ventas: 8934,
    tiempo_respuesta: '3-6 horas',
    ubicacion: 'Guadalajara, Jalisco',
    certificaciones: ['ISO 9001', 'NOM-026']
  },
  {
    id: '3',
    razon_social: 'Electro Materiales de Querétaro',
    nombre_comercial: 'ElectroQRO',
    descripcion: 'Distribuidores certificados de material eléctrico de alta calidad. Expertos en soluciones eléctricas integrales.',
    años_experiencia: 18,
    rating: 4.7,
    total_ventas: 6721,
    tiempo_respuesta: '1-3 horas',
    ubicacion: 'Querétaro, Querétaro',
    certificaciones: ['ISO 9001', 'NOM-001']
  },
  {
    id: '4',
    razon_social: 'Plomería Industrial del Bajío',
    nombre_comercial: 'PlomBajío',
    descripcion: 'Soluciones completas en sistemas de plomería para proyectos residenciales, comerciales e industriales.',
    años_experiencia: 25,
    rating: 4.5,
    total_ventas: 5432,
    tiempo_respuesta: '4-8 horas',
    ubicacion: 'León, Guanajuato',
    certificaciones: ['ISO 9001', 'NOM-002']
  },
  {
    id: '5',
    razon_social: 'Herramientas Profesionales México',
    nombre_comercial: 'HerramientasPro',
    descripcion: 'Importadores y distribuidores de herramientas profesionales de las mejores marcas internacionales.',
    años_experiencia: 22,
    rating: 4.9,
    total_ventas: 9856,
    tiempo_respuesta: '2-5 horas',
    ubicacion: 'Ciudad de México',
    certificaciones: ['ISO 9001', 'Distribuidor Autorizado']
  }
];

export const mockProducts = [
  {
    id: '1',
    nombre: 'Cemento Gris Portland CPC 30R',
    descripcion: 'Cemento Portland compuesto de alta resistencia, ideal para obras estructurales y construcción en general',
    precio: 185.50,
    pricing_mode: 'PRECIO' as const,
    stock: 500,
    slug: 'cemento-gris-portland-cpc-30r',
    visible: true,
    approved: true,
    category_id: '1',
    provider_id: '1',
    category: mockCategories[0],
    provider: mockProviders[0],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1597476689533-be5e5f2ed544?w=400',
        alt: 'Saco de cemento Portland'
      }
    ],
    reviews: [
      {
        id: '1',
        user_name: 'Carlos Mendoza',
        rating: 5,
        comment: 'Excelente calidad del cemento, lo he usado en múltiples proyectos y siempre da buenos resultados. La resistencia es muy buena.',
        date: '2024-10-15',
        verified_purchase: true
      },
      {
        id: '2',
        user_name: 'Ana García',
        rating: 5,
        comment: 'Muy buen producto, llegó en perfecto estado y el tiempo de entrega fue el prometido. Lo recomiendo ampliamente.',
        date: '2024-10-08',
        verified_purchase: true
      },
      {
        id: '3',
        user_name: 'Roberto Sánchez',
        rating: 4,
        comment: 'Buen cemento, cumple con las especificaciones. El precio es competitivo comparado con otros proveedores.',
        date: '2024-09-28',
        verified_purchase: true
      },
      {
        id: '4',
        user_name: 'María López',
        rating: 5,
        comment: 'Perfecto para mi proyecto de ampliación. La calidad es excelente y el servicio de CEMEX siempre es confiable.',
        date: '2024-09-15',
        verified_purchase: true
      }
    ],
    faqs: [
      {
        id: '1',
        question: '¿Cuál es el tiempo de fraguado de este cemento?',
        answer: 'El tiempo de fraguado inicial es de aproximadamente 45 minutos y el fraguado final se alcanza en 10 horas bajo condiciones normales de temperatura (20°C).'
      },
      {
        id: '2',
        question: '¿Qué resistencia alcanza este cemento?',
        answer: 'Este cemento CPC 30R alcanza una resistencia mínima de 30 MPa (300 kg/cm²) a los 28 días de curado, cumpliendo con la norma NOM-127-SCFI.'
      },
      {
        id: '3',
        question: '¿Cuánto rinde un saco de cemento?',
        answer: 'Un saco de 50 kg rinde aproximadamente 33 litros de concreto. Para una mezcla estándar 1:2:3 (cemento:arena:grava), un saco alcanza para hacer aproximadamente 0.15 m³ de concreto.'
      },
      {
        id: '4',
        question: '¿Cómo debo almacenar el cemento?',
        answer: 'Debe almacenarse en un lugar seco, protegido de la humedad y sobre tarimas de madera. No debe estar en contacto directo con el suelo. El cemento bien almacenado mantiene sus propiedades por hasta 3 meses.'
      },
      {
        id: '5',
        question: '¿Es apto para uso en clima frío?',
        answer: 'Sí, este cemento puede usarse en clima frío, pero se recomienda proteger el concreto de las heladas durante las primeras 48 horas y mantener la temperatura de curado por encima de 5°C.'
      }
    ]
  },
  {
    id: '2',
    nombre: 'Varilla Corrugada #4 (1/2") - 12m',
    descripcion: 'Varilla de acero corrugada grado 42, calibre #4, longitud 12 metros. Para uso en estructuras de concreto reforzado',
    precio: 145.00,
    pricing_mode: 'PRECIO' as const,
    stock: 1200,
    slug: 'varilla-corrugada-4-12m',
    visible: true,
    approved: true,
    category_id: '2',
    provider_id: '2',
    category: mockCategories[1],
    provider: mockProviders[1],
    images: [
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400',
        alt: 'Varilla corrugada de acero'
      }
    ]
  },
  {
    id: '3',
    nombre: 'Cable THW Calibre 12 AWG',
    descripcion: 'Cable de cobre electrolítico suave, calibre 12 AWG, 600V. Rollo de 100 metros',
    precio: null,
    pricing_mode: 'COTIZAR' as const,
    stock: 250,
    slug: 'cable-thw-calibre-12',
    visible: true,
    approved: true,
    category_id: '3',
    provider_id: '3',
    category: mockCategories[2],
    provider: mockProviders[2],
    images: [
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400',
        alt: 'Cable eléctrico'
      }
    ]
  },
  {
    id: '4',
    nombre: 'Tubo PVC Hidráulico 4" x 6m',
    descripcion: 'Tubo de PVC hidráulico sanitario, diámetro 4 pulgadas, longitud 6 metros, presión 150 PSI',
    precio: 289.00,
    pricing_mode: 'PRECIO' as const,
    stock: 300,
    slug: 'tubo-pvc-hidraulico-4-6m',
    visible: true,
    approved: true,
    category_id: '4',
    provider_id: '4',
    category: mockCategories[3],
    provider: mockProviders[3],
    images: [
      {
        id: '4',
        url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
        alt: 'Tubo PVC'
      }
    ]
  },
  {
    id: '5',
    nombre: 'Taladro Percutor 1/2" 850W',
    descripcion: 'Taladro percutor profesional, potencia 850W, mandril 1/2", velocidad variable, incluye maletín y accesorios',
    precio: 1850.00,
    pricing_mode: 'PRECIO' as const,
    stock: 45,
    slug: 'taladro-percutor-850w',
    visible: true,
    approved: true,
    category_id: '5',
    provider_id: '5',
    category: mockCategories[4],
    provider: mockProviders[4],
    images: [
      {
        id: '5',
        url: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400',
        alt: 'Taladro percutor'
      }
    ]
  },
  {
    id: '6',
    nombre: 'Concreto Premezclado f\'c=250 kg/cm²',
    descripcion: 'Concreto premezclado de alta resistencia, incluye aditivos plastificantes. Entrega en obra',
    precio: null,
    pricing_mode: 'COTIZAR' as const,
    stock: 0,
    slug: 'concreto-premezclado-250',
    visible: true,
    approved: true,
    category_id: '1',
    provider_id: '1',
    category: mockCategories[0],
    provider: mockProviders[0],
    images: [
      {
        id: '6',
        url: 'https://images.unsplash.com/photo-1590501618530-f7b78ce726fd?w=400',
        alt: 'Concreto premezclado'
      }
    ]
  },
  {
    id: '7',
    nombre: 'Alambrón Recocido Calibre 16',
    descripcion: 'Alambrón de acero recocido, calibre 16, para amarre de varilla y trabajos generales. Rollo 50 kg',
    precio: 28.50,
    pricing_mode: 'PRECIO' as const,
    stock: 800,
    slug: 'alambron-recocido-16',
    visible: true,
    approved: true,
    category_id: '2',
    provider_id: '2',
    category: mockCategories[1],
    provider: mockProviders[1],
    images: [
      {
        id: '7',
        url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400',
        alt: 'Alambrón de acero'
      }
    ]
  },
  {
    id: '8',
    nombre: 'Interruptor Termomagnético 2P 30A',
    descripcion: 'Interruptor termomagnético de 2 polos, capacidad 30 amperes, 240V, certificado NOM',
    precio: 285.00,
    pricing_mode: 'PRECIO' as const,
    stock: 120,
    slug: 'interruptor-termomagnetico-2p-30a',
    visible: true,
    approved: true,
    category_id: '3',
    provider_id: '3',
    category: mockCategories[2],
    provider: mockProviders[2],
    images: [
      {
        id: '8',
        url: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400',
        alt: 'Interruptor termomagnético'
      }
    ]
  },
  {
    id: '9',
    nombre: 'Codo PVC 90° de 2"',
    descripcion: 'Codo de PVC sanitario 90 grados, diámetro 2 pulgadas, cementable',
    precio: 18.50,
    pricing_mode: 'PRECIO' as const,
    stock: 2500,
    slug: 'codo-pvc-90-2',
    visible: true,
    approved: true,
    category_id: '4',
    provider_id: '4',
    category: mockCategories[3],
    provider: mockProviders[3],
    images: [
      {
        id: '9',
        url: 'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=400',
        alt: 'Codo de PVC'
      }
    ]
  },
  {
    id: '10',
    nombre: 'Sierra Circular 7-1/4" 1800W',
    descripcion: 'Sierra circular profesional, disco 7-1/4", potencia 1800W, profundidad de corte ajustable',
    precio: 2450.00,
    pricing_mode: 'PRECIO' as const,
    stock: 28,
    slug: 'sierra-circular-1800w',
    visible: true,
    approved: true,
    category_id: '5',
    provider_id: '5',
    category: mockCategories[4],
    provider: mockProviders[4],
    images: [
      {
        id: '10',
        url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400',
        alt: 'Sierra circular'
      }
    ]
  },
  {
    id: '11',
    nombre: 'Mortero para Pegar Block',
    descripcion: 'Mortero adhesivo de alta adherencia para block y tabique. Saco 20 kg, rendimiento aprox. 80 piezas',
    precio: 95.00,
    pricing_mode: 'PRECIO' as const,
    stock: 650,
    slug: 'mortero-pegar-block',
    visible: true,
    approved: true,
    category_id: '1',
    provider_id: '1',
    category: mockCategories[0],
    provider: mockProviders[0],
    images: [
      {
        id: '11',
        url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400',
        alt: 'Saco de mortero'
      }
    ]
  },
  {
    id: '12',
    nombre: 'Malla Electrosoldada 6x6-10/10',
    descripcion: 'Malla electrosoldada de acero, cuadrícula 6x6 cm, calibre 10/10, panel de 6x2.5 m',
    precio: null,
    pricing_mode: 'COTIZAR' as const,
    stock: 0,
    slug: 'malla-electrosoldada-6x6',
    visible: true,
    approved: true,
    category_id: '2',
    provider_id: '2',
    category: mockCategories[1],
    provider: mockProviders[1],
    images: [
      {
        id: '12',
        url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400',
        alt: 'Malla electrosoldada'
      }
    ]
  }
];

// Helper function to filter products
export function filterMockProducts(filters: {
  category?: string;
  search?: string;
  pricing_mode?: string;
}) {
  let filtered = [...mockProducts];

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    const category = mockCategories.find(cat => cat.slug === filters.category);
    if (category) {
      filtered = filtered.filter(p => p.category_id === category.id);
    }
  }

  // Filter by search
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(p =>
      p.nombre.toLowerCase().includes(searchLower) ||
      p.descripcion.toLowerCase().includes(searchLower)
    );
  }

  // Filter by pricing mode
  if (filters.pricing_mode) {
    filtered = filtered.filter(p => p.pricing_mode === filters.pricing_mode);
  }

  return filtered;
}

// Mock stats
export const mockStats = {
  totalProducts: mockProducts.length,
  totalProviders: mockProviders.length,
  totalCategories: mockCategories.length
};
