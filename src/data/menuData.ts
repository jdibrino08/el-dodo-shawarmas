export type BadgeIconType = 'award' | 'flame' | 'zap' | 'coffee' | 'sparkles' | 'crown'

export interface MenuItem {
  id: string
  name: string
  tagline: string
  description: string
  /** Whole USD amounts suited to San Diego, Carabobo cash/Pago Móvil economy ($5-$20) */
  price: number
  category: 'shawarmas' | 'combos' | 'extras' | 'desayunos'
  badge?: string
  badgeIcon?: BadgeIconType
  prepTime: string
  flavorNotes: [string, string]
  spicyLevel: 1 | 2 | 3
  image: string
  ingredients: string[]
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dodo-mixto-especial',
    name: 'Shawarma Mixto Especial Dodo',
    tagline: 'Carne y Pollo al Trompo • Pan Saj Caliente',
    description:
      'Generosas láminas de res y pollo marinados 24 horas al carbón, crema de ajo Toum artesanal, vegetales frescos, pepinillos y papitas crujientes en pan saj tostado al instante.',
    price: 8,
    category: 'shawarmas',
    badge: 'Más Pedido en San Diego',
    badgeIcon: 'crown',
    prepTime: '8 min',
    flavorNotes: ['Pan Saj Tostado', 'Doble Salsa de Ajo'],
    spicyLevel: 2,
    image:
      'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      'Carne y Pollo al trompo',
      'Salsa de ajo Toum',
      'Vegetales frescos',
      'Papitas crujientes',
      'Pan Saj caliente',
    ],
  },
  {
    id: 'shawarma-pollo-crujiente',
    name: 'Shawarma de Pollo Crujiente',
    tagline: 'Pechuga Especiada • Doble Crema de Ajo',
    description:
      'Pollo jugoso dorado al trompo con especias levantinas, abundante crema de ajo casera, lechuga crujiente, tomate fresco y toque de perejil plano.',
    price: 7,
    category: 'shawarmas',
    badge: 'Favorito Rápido',
    badgeIcon: 'zap',
    prepTime: '6 min',
    flavorNotes: ['Pollo Dorado', 'Crema Toum Casera'],
    spicyLevel: 1,
    image:
      'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      'Pollo especiado al trompo',
      'Doble salsa de ajo',
      'Lechuga y tomate',
      'Perejil fresco',
    ],
  },
  {
    id: 'shawarma-carne-gratinado',
    name: 'Shawarma de Carne Gratinado+',
    tagline: 'Res al Carbón • Queso Fundido & Salsa Tártara',
    description:
      'Finas láminas de carne de res jugosa al fuego vivo, queso fundido cremoso en plancha, cebolla encurtida, crema de ajo y salsa especial de la casa.',
    price: 9,
    category: 'shawarmas',
    badge: 'Especial del Asador',
    badgeIcon: 'flame',
    prepTime: '8 min',
    flavorNotes: ['Queso Fundido', 'Carne al Carbón'],
    spicyLevel: 2,
    image:
      'https://images.unsplash.com/photo-1662116765994-1e4200c43589?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      'Carne de res al carbón',
      'Queso gratinado',
      'Cebolla morada',
      'Salsa especial Dodo+',
    ],
  },
  {
    id: 'combo-drive-through',
    name: 'Combo Dodo Drive-Through',
    tagline: 'Listo para Retirar sin Bajar del Carro',
    description:
      '1 Shawarma Mixto Especial + Ración de papas fritas doradas con toque de ajo y cilantro + Bebida bien fría. Ideal para pasar por Av. Paseo Tulipán.',
    price: 10,
    category: 'combos',
    badge: 'Ideal Auto-Servicio',
    badgeIcon: 'award',
    prepTime: '7 min',
    flavorNotes: ['Incluye Papas + Bebida', 'Entrega sin Cola'],
    spicyLevel: 1,
    image:
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      'Shawarma Mixto',
      'Papas doradas crujientes',
      'Bebida fría 355ml',
      'Dip de salsa de ajo',
    ],
  },
  {
    id: 'combo-familiar-dodo',
    name: 'Combo Familiar El Dodo (4 Pers.)',
    tagline: '4 Shawarmas + Papas Grandes + 4 Bebidas',
    description:
      '2 Shawarmas Mixtos Especiales + 2 Shawarmas de Pollo Crujiente + Ración familiar de papas + 2 salsas de ajo grandes + 4 bebidas frías.',
    price: 20,
    category: 'combos',
    badge: 'Mejor Valor ($5 c/u)',
    badgeIcon: 'sparkles',
    prepTime: '12 min',
    flavorNotes: ['Para Compartir', 'Doble Dip de Ajo'],
    spicyLevel: 1,
    image:
      'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '2 Mixtos + 2 de Pollo',
      'Papas familiares',
      '2 cremas Toum grandes',
      '4 bebidas frías',
    ],
  },
  {
    id: 'desayuno-dodo-manana',
    name: 'Wrap Mañanero & Café (y +)',
    tagline: 'Disponible Desde las 7:30 AM en San Diego',
    description:
      'Pan saj caliente a la plancha relleno de pollo mechado o queso blanco fundido, jamón dorado y toque de salsa suave, acompañado de café recién colado.',
    price: 6,
    category: 'desayunos',
    badge: 'Desde las 7:30 AM',
    badgeIcon: 'coffee',
    prepTime: '5 min',
    flavorNotes: ['Pan Recién Planchado', 'Incluye Café'],
    spicyLevel: 1,
    image:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      'Pan Saj a la plancha',
      'Queso fundido / Pollo',
      'Café negro o con leche',
    ],
  },
]
