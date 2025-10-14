import type { Locale } from '@/i18n'

export interface MockProject {
  _id: string
  title: Record<Locale, string>
  slug: { current: string }
  coverImage?: string
  pricing: {
    price: number
    currency: string
  }
  investment?: {
    yield?: number
  }
  delivery?: {
    quarter?: string
    year?: number
  }
  status: string
  location?: {
    city?: string
  }
  highlights?: string[]
}

export const mockProjects: MockProject[] = [
  {
    _id: '1',
    title: {
      en: 'Vake Premium Residence',
      ka: 'ვაკე პრემიუმ რეზიდენცია',
      ru: 'Ваке Премиум Резиденция',
      he: 'Vake Premium Residence',
      az: 'Vake Premium Yaşayış',
      hy: 'Vake Premium Residence',
      uk: 'Ваке Преміум Резиденція',
    },
    slug: { current: 'vake-premium-residence' },
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    pricing: {
      price: 185000,
      currency: 'USD',
    },
    investment: {
      yield: 12.5,
    },
    delivery: {
      quarter: 'Q2',
      year: 2025,
    },
    status: 'underConstruction',
    location: {
      city: 'Tbilisi',
    },
    highlights: ['Prime Location', 'High ROI'],
  },
  {
    _id: '2',
    title: {
      en: 'Batumi Seaview Aparthotel',
      ka: 'ბათუმი სივიუ აპარტოტელი',
      ru: 'Батуми Сивью Апартотель',
      he: 'Batumi Seaview Aparthotel',
      az: 'Batumi Seaview Aparthotel',
      hy: 'Batumi Seaview Aparthotel',
      uk: 'Батумі Сівью Апартотель',
    },
    slug: { current: 'batumi-seaview-aparthotel' },
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    pricing: {
      price: 95000,
      currency: 'USD',
    },
    investment: {
      yield: 15.2,
    },
    delivery: {
      quarter: 'Q4',
      year: 2024,
    },
    status: 'ready',
    location: {
      city: 'Batumi',
    },
    highlights: ['Beachfront', 'Rental Guaranteed'],
  },
  {
    _id: '3',
    title: {
      en: 'Saburtalo Business District',
      ka: 'საბურთალო ბიზნეს დისტრიქტი',
      ru: 'Сабуртало Бизнес Дистрикт',
      he: 'Saburtalo Business District',
      az: 'Saburtalo Business District',
      hy: 'Saburtalo Business District',
      uk: 'Сабурт­ало Бізнес Дистрикт',
    },
    slug: { current: 'saburtalo-business-district' },
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    pricing: {
      price: 320000,
      currency: 'USD',
    },
    investment: {
      yield: 10.8,
    },
    delivery: {
      quarter: 'Q1',
      year: 2026,
    },
    status: 'offPlan',
    location: {
      city: 'Tbilisi',
    },
    highlights: ['Commercial Property', 'Growing Area'],
  },
  {
    _id: '4',
    title: {
      en: 'Mtatsminda Luxury Villa',
      ka: 'მთაწმინდა ლუქს ვილა',
      ru: 'Мтацминда Люкс Вилла',
      he: 'Mtatsminda Luxury Villa',
      az: 'Mtatsminda Luxury Villa',
      hy: 'Mtatsminda Luxury Villa',
      uk: 'Мтацмінда Люкс Вілла',
    },
    slug: { current: 'mtatsminda-luxury-villa' },
    coverImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop',
    pricing: {
      price: 550000,
      currency: 'USD',
    },
    investment: {
      yield: 8.5,
    },
    delivery: {
      quarter: 'Q3',
      year: 2025,
    },
    status: 'underConstruction',
    location: {
      city: 'Tbilisi',
    },
    highlights: ['Premium Location', 'Panoramic Views'],
  },
  {
    _id: '5',
    title: {
      en: 'Didi Dighomi New Development',
      ka: 'დიდი დიღომი ახალი განაშენიანება',
      ru: 'Диди Дигоми Новая Застройка',
      he: 'Didi Dighomi New Development',
      az: 'Didi Dighomi Yeni İnkişaf',
      hy: 'Didi Dighomi New Development',
      uk: 'Діді Дігомі Нова Забудова',
    },
    slug: { current: 'didi-dighomi-new-development' },
    coverImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    pricing: {
      price: 120000,
      currency: 'USD',
    },
    investment: {
      yield: 13.7,
    },
    delivery: {
      quarter: 'Q2',
      year: 2025,
    },
    status: 'underConstruction',
    location: {
      city: 'Tbilisi',
    },
    highlights: ['Family Friendly', 'Modern Design'],
  },
  {
    _id: '6',
    title: {
      en: 'Old Tbilisi Heritage Restoration',
      ka: 'ძველი თბილისის მემკვიდრეობის რესტავრაცია',
      ru: 'Старый Тбилиси Реставрация',
      he: 'Old Tbilisi Heritage Restoration',
      az: 'Köhnə Tbilisi İrsi Bərpası',
      hy: 'Old Tbilisi Heritage Restoration',
      uk: 'Старий Тбілісі Реставрація',
    },
    slug: { current: 'old-tbilisi-heritage-restoration' },
    coverImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop',
    pricing: {
      price: 275000,
      currency: 'USD',
    },
    investment: {
      yield: 11.3,
    },
    delivery: {
      quarter: 'Q4',
      year: 2025,
    },
    status: 'underConstruction',
    location: {
      city: 'Tbilisi',
    },
    highlights: ['Historic District', 'Unique Character'],
  },
]
