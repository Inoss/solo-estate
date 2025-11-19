import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * SOLO Estate - Complete Real Projects Seed
 * All data sourced from korter.ge
 * ~50+ featured active projects from 16 Georgian developers
 *
 * Note: Focusing on key projects with complete data
 * Investment metrics (yield, ROI, etc.) and images to be added separately
 */

interface ProjectData {
  slug: string
  titleEn: string
  titleKa: string
  titleRu: string
  descriptionEn: string
  descriptionKa: string
  descriptionRu: string
  developerSlug: string
  locationCity: string
  locationArea?: string
  locationAddress?: string
  price: number
  pricePerSqm?: number | null
  priceFrom?: number | null
  propertyType: 'apartment' | 'aparthotel' | 'villa'
  status: 'offPlan' | 'underConstruction' | 'ready'
  deliveryQuarter?: string | null
  deliveryYear?: number | null
  featured: boolean
}

const projectsData: ProjectData[] = [
  // VR HOLDING
  {
    slug: 'krtsanisi-resort-residence',
    titleEn: 'Krtsanisi Resort Residence',
    titleKa: 'კრწანისის რეზორტ რეზიდენცია',
    titleRu: 'Крцаниси Резорт Резиденс',
    descriptionEn: 'First resort-type settlement in the diplomatic district. Luxury residential complex combining modern amenities with natural surroundings in prestigious Krtsanisi.',
    descriptionKa: 'პირველი რეზორტული ტიპის დასახლება დიპლომატიურ რაიონში. ლუქს საცხოვრებელი კომპლექსი.',
    descriptionRu: 'Первый поселок курортного типа в дипломатическом районе. Роскошный жилой комплекс.',
    developerSlug: 'vr-holding',
    locationCity: 'Tbilisi',
    locationArea: 'Krtsanisi',
    price: 195500,
    pricePerSqm: 1955,
    propertyType: 'apartment',
    status: 'underConstruction',
    deliveryQuarter: 'Q4',
    deliveryYear: 2028,
    featured: false,
  },
  {
    slug: 'vr-shekvetili-forest-beach',
    titleEn: 'VR Shekvetili Forest-Beach',
    titleKa: 'VR შექვეთილი ფორესტ-ბიჩი',
    titleRu: 'VR Шекветили Форест-Бич',
    descriptionEn: 'New destination on the Black Sea coast, designed for active living in all four seasons. Resort residence combining forest and beach lifestyle.',
    descriptionKa: 'ახალი დანიშნულება შავი ზღვის სანაპიროზე, შექმნილი აქტიური ცხოვრებისთვის ყველა ოთხ სეზონში.',
    descriptionRu: 'Новое направление на побережье Черного моря, предназначенное для активной жизни во все четыре сезона.',
    developerSlug: 'vr-holding',
    locationCity: 'Shekvetili',
    price: 150000,
    propertyType: 'apartment',
    status: 'underConstruction',
    deliveryQuarter: 'Q4',
    deliveryYear: 2028,
    featured: false,
  },
  {
    slug: 'vr-vake-sky-tower',
    titleEn: 'VR Vake Sky Tower',
    titleKa: 'VR ვაკე სკაი თაუერი',
    titleRu: 'VR Ваке Скай Тауэр',
    descriptionEn: 'Will be the tallest building in Tbilisi at 180 meters. Premium high-rise residential tower in the heart of Vake at 49 Chavchavadze Street.',
    descriptionKa: 'იქნება თბილისის უმაღლესი შენობა 180 მეტრით. პრემიუმ მაღალსართულიანი საცხოვრებელი კოშკი ვაკის გულში.',
    descriptionRu: 'Будет самым высоким зданием в Тбилиси высотой 180 метров. Премиум высотная жилая башня в сердце Ваке.',
    developerSlug: 'vr-holding',
    locationCity: 'Tbilisi',
    locationArea: 'Vake',
    locationAddress: '49 Chavchavadze Street',
    price: 250000,
    propertyType: 'apartment',
    status: 'offPlan',
    deliveryQuarter: 'Q3',
    deliveryYear: 2028,
    featured: true,
  },

  // BIOGRAPI LIVING
  {
    slug: 'sakeni-by-biograpi',
    titleEn: 'Sakeni',
    titleKa: 'საკენი',
    titleRu: 'Сакени',
    descriptionEn: 'Premium apartment complex in Saburtalo, one of Tbilisi\'s most prestigious districts. Located on Vaja-Pshavela Avenue with modern amenities.',
    descriptionKa: 'პრემიუმ აპარტამენტების კომპლექსი საბურთალოში, თბილისის ერთ-ერთ ყველაზე პრესტიჟულ რაიონში.',
    descriptionRu: 'Премиум комплекс апартаментов в Сабуртало, одном из самых престижных районов Тбилиси.',
    developerSlug: 'biograpi',
    locationCity: 'Tbilisi',
    locationArea: 'Saburtalo',
    locationAddress: 'Vaja-Pshavela Ave, 25',
    price: 124402,
    pricePerSqm: 2925,
    priceFrom: 124402,
    propertyType: 'apartment',
    status: 'underConstruction',
    deliveryQuarter: 'Q4',
    deliveryYear: 2026,
    featured: true,
  },
  {
    slug: 'bare-by-biograpi',
    titleEn: 'Bare by Biograpi',
    titleKa: 'ბარე ბიოგრაფი',
    titleRu: 'Баре от Биографи',
    descriptionEn: 'Premium residential project in Isani on Niko Lomouri Street. High-end apartments with exceptional design and quality finishes.',
    descriptionKa: 'პრემიუმ საცხოვრებელი პროექტი ისანში. მაღალი კლასის აპარტამენტები განსაკუთრებული დიზაინით.',
    descriptionRu: 'Премиальный жилой проект в Исани. Высококлассные апартаменты с исключительным дизайном.',
    developerSlug: 'biograpi',
    locationCity: 'Tbilisi',
    locationArea: 'Isani',
    locationAddress: 'Niko Lomouri St. 3',
    price: 116600,
    pricePerSqm: 3800,
    priceFrom: 116600,
    propertyType: 'apartment',
    status: 'underConstruction',
    deliveryQuarter: 'Q4',
    deliveryYear: 2027,
    featured: false,
  },

  // NEXT GROUP
  {
    slug: 'next-downtown-batumi',
    titleEn: 'Next Downtown',
    titleKa: 'ნექსთ დაუნთაუნი',
    titleRu: 'Некст Даунтаун',
    descriptionEn: 'Premium residential complex in Batumi Old City. Highest price per m² in the portfolio at $4,050. Prime location in the historical center.',
    descriptionKa: 'პრემიუმ საცხოვრებელი კომპლექსი ბათუმის ძველ ქალაქში. პრემიუმ ლოკაცია ისტორიულ ცენტრში.',
    descriptionRu: 'Премиум жилой комплекс в Старом городе Батуми. Премиальная локация в историческом центре.',
    developerSlug: 'next-group',
    locationCity: 'Batumi',
    locationArea: 'Old City',
    price: 200000,
    pricePerSqm: 4050,
    propertyType: 'apartment',
    status: 'underConstruction',
    deliveryQuarter: 'Q4',
    deliveryYear: 2025,
    featured: true,
  },
  {
    slug: 'wyndham-residence-batumi',
    titleEn: 'Wyndham Residence Batumi',
    titleKa: 'ვინდჰემ რეზიდენს ბათუმი',
    titleRu: 'Виндхэм Резиденс Батуми',
    descriptionEn: 'Branded hotel residence in Gonio under Wyndham Hotels & Resorts brand. Investment opportunity with guaranteed rental income and international hotel management.',
    descriptionKa: 'ბრენდირებული სასტუმრო რეზიდენცია გონიოში Wyndham Hotels ბრენდით. საინვესტიციო შესაძლებლობა გარანტირებული შემოსავლით.',
    descriptionRu: 'Брендированная отельная резиденция в Гонио под брендом Wyndham Hotels. Инвестиционная возможность с гарантированным доходом.',
    developerSlug: 'next-group',
    locationCity: 'Gonio',
    price: 138600,
    pricePerSqm: 2772,
    propertyType: 'aparthotel',
    status: 'underConstruction',
    deliveryQuarter: 'Q4',
    deliveryYear: 2026,
    featured: true,
  },
  {
    slug: 'radisson-residences-gonio',
    titleEn: 'Radisson Residences',
    titleKa: 'რედისონ რეზიდენსები',
    titleRu: 'Рэдиссон Резиденс',
    descriptionEn: 'Branded hotel residence in Gonio under Radisson Hotels brand. Premium investment property with hotel management and guaranteed returns.',
    descriptionKa: 'ბრენდირებული სასტუმრო რეზიდენცია გონიოში Radisson Hotels ბრენდით. პრემიუმ საინვესტიციო ქონება.',
    descriptionRu: 'Брендированная отельная резиденция в Гонио под брендом Radisson Hotels. Премиум инвестиционная недвижимость.',
    developerSlug: 'next-group',
    locationCity: 'Gonio',
    price: 158000,
    pricePerSqm: 3160,
    propertyType: 'aparthotel',
    status: 'underConstruction',
    deliveryQuarter: 'Q2',
    deliveryYear: 2027,
    featured: true,
  },

  // GUMBATI GROUP
  {
    slug: 'portline-by-gumbati',
    titleEn: 'Portline by Gumbati',
    titleKa: 'პორტლაინი გუმბათი',
    titleRu: 'Портлайн от Гумбати',
    descriptionEn: 'Premium coastal residential complex in Batumi on Makatsaria Street. Developed by the market leader with 500,000+ m² experience and 20+ years in the industry.',
    descriptionKa: 'პრემიუმ სანაპირო საცხოვრებელი კომპლექსი ბათუმში. განვითარებული ბაზრის ლიდერის მიერ 500,000+ მ² გამოცდილებით.',
    descriptionRu: 'Премиум прибрежный жилой комплекс в Батуми. Разработан лидером рынка с опытом 500,000+ м².',
    developerSlug: 'gumbati-group',
    locationCity: 'Batumi',
    locationAddress: 'Makatsaria St, 11',
    price: 128656,
    pricePerSqm: 2600,
    priceFrom: 128656,
    propertyType: 'apartment',
    status: 'underConstruction',
    deliveryQuarter: 'Q3',
    deliveryYear: 2026,
    featured: true,
  },
  {
    slug: 'midtown-batumi',
    titleEn: 'Midtown',
    titleKa: 'მიდთაუნი',
    titleRu: 'Мидтаун',
    descriptionEn: 'Centrally located residential complex in Batumi on Vakhtang Gorgasali Street. Perfect balance of location, price, and quality from experienced developer.',
    descriptionKa: 'ცენტრალურად მდებარე საცხოვრებელი კომპლექსი ბათუმში. სრულყოფილი ბალანსი ლოკაციას, ფასსა და ხარისხს შორის.',
    descriptionRu: 'Центрально расположенный жилой комплекс в Батуми. Идеальный баланс между локацией, ценой и качеством.',
    developerSlug: 'gumbati-group',
    locationCity: 'Batumi',
    locationAddress: 'Vakhtang Gorgasali St, 99',
    price: 136800,
    pricePerSqm: 1800,
    priceFrom: 136800,
    propertyType: 'apartment',
    status: 'underConstruction',
    deliveryQuarter: 'Q4',
    deliveryYear: 2025,
    featured: false,
  },
  {
    slug: 'boulevard-point-batumi',
    titleEn: 'Boulevard Point',
    titleKa: 'ბულვარ პოინთი',
    titleRu: 'Бульвар Поинт',
    descriptionEn: 'Ready residential complex in Batumi on Zghvispiri Street. Move-in ready apartments from established Gumbati Group, completed in 2024.',
    descriptionKa: 'მზად საცხოვრებელი კომპლექსი ბათუმში. დასრულებული 2024 წელს.',
    descriptionRu: 'Готовый жилой комплекс в Батуми. Завершен в 2024 году.',
    developerSlug: 'gumbati-group',
    locationCity: 'Batumi',
    locationAddress: 'Zghvispiri St, 1b',
    price: 69758,
    pricePerSqm: 2350,
    priceFrom: 69758,
    propertyType: 'apartment',
    status: 'ready',
    deliveryYear: 2024,
    featured: false,
  },

  // METROPOL
  {
    slug: 'metropol-oval',
    titleEn: 'Oval',
    titleKa: 'ოვალი',
    titleRu: 'Овал',
    descriptionEn: 'Uniquely designed oval-shaped residential complex in Batumi. Modern architecture with sea views, developed by one of Georgia\'s most forward-thinking developers.',
    descriptionKa: 'უნიკალურად დიზაინებული ოვალური ფორმის საცხოვრებელი კომპლექსი ბათუმში. თანამედროვე არქიტექტურა ზღვის ხედით.',
    descriptionRu: 'Уникальный овальный жилой комплекс в Батуми. Современная архитектура с видом на море.',
    developerSlug: 'metropol',
    locationCity: 'Batumi',
    price: 115500,
    pricePerSqm: 2310,
    propertyType: 'apartment',
    status: 'underConstruction',
    deliveryQuarter: 'Q4',
    deliveryYear: 2027,
    featured: true,
  },
  {
    slug: 'metropol-kavtaradze',
    titleEn: 'Metropol Kavtaradze',
    titleKa: 'მეტროპოლ ქავთარაძე',
    titleRu: 'Метрополь Кавтарадзе',
    descriptionEn: 'Premium residential complex in prestigious Vake district. Multifunctional development combining investment potential with well-planned infrastructure.',
    descriptionKa: 'პრემიუმ საცხოვრებელი კომპლექსი პრესტიჟულ ვაკეში. მრავალფუნქციური განვითარება.',
    descriptionRu: 'Премиум жилой комплекс в престижном районе Ваке. Многофункциональный комплекс.',
    developerSlug: 'metropol',
    locationCity: 'Tbilisi',
    locationArea: 'Vake',
    price: 87000,
    pricePerSqm: 1740,
    propertyType: 'apartment',
    status: 'underConstruction',
    deliveryQuarter: 'Q2',
    deliveryYear: 2027,
    featured: true,
  },

  // ALLIANCE GROUP
  {
    slug: 'highlands-by-alliance',
    titleEn: 'Highlands by Alliance',
    titleKa: 'ჰაილენდსი ბაი ალიანსი',
    titleRu: 'Хайлэндс от Альянс',
    descriptionEn: 'Premium investment opportunity in Batumi. Highland-style residential complex from Alliance Group, founded in 2005 with proven track record.',
    descriptionKa: 'პრემიუმ საინვესტიციო შესაძლებლობა ბათუმში. ჰაილენდის სტილის საცხოვრებელი კომპლექსი.',
    descriptionRu: 'Премиум инвестиционная возможность в Батуми. Жилой комплекс в стиле хайлэндс.',
    developerSlug: 'alliance-group',
    locationCity: 'Batumi',
    price: 105000,
    pricePerSqm: 2100,
    propertyType: 'apartment',
    status: 'underConstruction',
    deliveryQuarter: 'Q4',
    deliveryYear: 2025,
    featured: true,
  },
  {
    slug: 'alliance-renaissance',
    titleEn: 'Alliance Renaissance',
    titleKa: 'ალიანსი რენესანსი',
    titleRu: 'Альянс Ренессанс',
    descriptionEn: 'Coastal residential complex in Kobuleti. Premium location on the Black Sea coast with modern amenities and beach access.',
    descriptionKa: 'სანაპირო საცხოვრებელი კომპლექსი ქობულეთში. პრემიუმ ლოკაცია შავი ზღვის სანაპიროზე.',
    descriptionRu: 'Прибрежный жилой комплекс в Кобулети. Премиум локация на побережье Черного моря.',
    developerSlug: 'alliance-group',
    locationCity: 'Kobuleti',
    price: 90000,
    pricePerSqm: 1800,
    propertyType: 'apartment',
    status: 'underConstruction',
    deliveryQuarter: 'Q4',
    deliveryYear: 2028,
    featured: false,
  },

  // DOMUS DEVELOPMENT
  {
    slug: 'domus-chavchavadze-31',
    titleEn: 'Domus Chavchavadze 31',
    titleKa: 'დომუსი ჭავჭავაძე 31',
    titleRu: 'Домус Чавчавадзе 31',
    descriptionEn: 'Ultra-premium residential complex in the heart of Vake. Exclusive location on Chavchavadze Avenue, the most prestigious address in Tbilisi.',
    descriptionKa: 'ულტრა-პრემიუმ საცხოვრებელი კომპლექსი ვაკის გულში. ექსკლუზიური ლოკაცია ჭავჭავაძის გამზირზე.',
    descriptionRu: 'Ультра-премиум жилой комплекс в сердце Ваке. Эксклюзивная локация на проспекте Чавчавадзе.',
    developerSlug: 'domus-development',
    locationCity: 'Tbilisi',
    locationArea: 'Vake',
    price: 160000,
    pricePerSqm: 3200,
    propertyType: 'apartment',
    status: 'underConstruction',
    deliveryQuarter: 'Q4',
    deliveryYear: 2026,
    featured: true,
  },
  {
    slug: 'domus-sera',
    titleEn: 'Domus Sera',
    titleKa: 'დომუსი სერა',
    titleRu: 'Домус Сера',
    descriptionEn: 'Ultra-premium residential complex in Vake. Highest-end offering from Domus at $4,000/m². Unparalleled luxury and quality from developer with 10+ completed projects.',
    descriptionKa: 'ულტრა-პრემიუმ საცხოვრებელი კომპლექსი ვაკეში. უმაღლესი კლასის შეთავაზება დომუსისგან.',
    descriptionRu: 'Ультра-премиум жилой комплекс в Ваке. Предложение высшего класса от Domus.',
    developerSlug: 'domus-development',
    locationCity: 'Tbilisi',
    locationArea: 'Vake',
    price: 200000,
    pricePerSqm: 4000,
    propertyType: 'apartment',
    status: 'underConstruction',
    featured: true,
  },

  // ELT BUILDING
  {
    slug: 'barcelo-tbilisi',
    titleEn: 'Barcelo Tbilisi',
    titleKa: 'ბარსელო თბილისი',
    titleRu: 'Барсело Тбилиси',
    descriptionEn: 'Branded hotel residence in Tbilisi on Richard Holbrooke Street. International Barcelo Hotels brand with guaranteed rental income and professional management.',
    descriptionKa: 'ბრენდირებული სასტუმრო რეზიდენცია თბილისში. საერთაშორისო Barcelo Hotels ბრენდი.',
    descriptionRu: 'Брендированная отельная резиденция в Тбилиси. Международный бренд Barcelo Hotels.',
    developerSlug: 'elt-building',
    locationCity: 'Tbilisi',
    locationAddress: 'Richard Holbrooke St, 12',
    price: 150000,
    propertyType: 'aparthotel',
    status: 'underConstruction',
    deliveryQuarter: 'Q4',
    deliveryYear: 2027,
    featured: true,
  },

  // BLOX
  {
    slug: 'blox-gudauri',
    titleEn: 'Blox Gudauri',
    titleKa: 'ბლოქსი გუდაური',
    titleRu: 'Блокс Гудаури',
    descriptionEn: 'Premium ski resort apartments in Gudauri mountain resort. High-altitude investment opportunity in Georgia\'s premier ski destination with year-round rental potential.',
    descriptionKa: 'პრემიუმ სათხილამურო კურორტის აპარტამენტები გუდაურში. მაღალმთიანი საინვესტიციო შესაძლებლობა.',
    descriptionRu: 'Премиум апартаменты на горнолыжном курорте Гудаури. Высокогорная инвестиционная возможность.',
    developerSlug: 'blox',
    locationCity: 'Gudauri',
    price: 150000,
    pricePerSqm: 3000,
    propertyType: 'apartment',
    status: 'underConstruction',
    deliveryQuarter: 'Q4',
    deliveryYear: 2027,
    featured: true,
  },

  // X2 DEVELOPMENT
  {
    slug: 'bakuriani-4rest',
    titleEn: 'Bakuriani 4Rest',
    titleKa: 'ბაკურიანი 4რესტ',
    titleRu: 'Бакуриани 4Рест',
    descriptionEn: 'Mountain resort apartments in Bakuriani on Koba Tsakadze Street. Perfect for ski season rentals in Georgia\'s family-friendly ski resort.',
    descriptionKa: 'მთის კურორტის აპარტამენტები ბაკურიანში. სრულყოფილი სათხილამურო სეზონის გასაქირავებლად.',
    descriptionRu: 'Горнолыжные апартаменты в Бакуриани. Идеально для аренды в лыжный сезон.',
    developerSlug: 'x2-development',
    locationCity: 'Bakuriani',
    locationAddress: 'Koba Tsakadze St, 32',
    price: 40000,
    pricePerSqm: 800,
    propertyType: 'apartment',
    status: 'ready',
    deliveryYear: 2022,
    featured: false,
  },

  // MONOLITH GROUP
  {
    slug: 'monolith-green-city',
    titleEn: 'Monolith Green City',
    titleKa: 'მონოლითი გრინ სითი',
    titleRu: 'Монолит Грин Сити',
    descriptionEn: 'Ready residential complex in Krtsanisi on Nadikvari III Street. Move-in ready apartments built with monolithic-frame technology for seismic stability.',
    descriptionKa: 'მზად საცხოვრებელი კომპლექსი კრწანისში. აშენებული მონოლითურ-კარკასული ტექნოლოგიით.',
    descriptionRu: 'Готовый жилой комплекс в Крцаниси. Построен по монолитно-каркасной технологии.',
    developerSlug: 'monolith-group',
    locationCity: 'Tbilisi',
    locationArea: 'Krtsanisi',
    locationAddress: 'Nadikvari III Street',
    price: 60000,
    pricePerSqm: 1200,
    propertyType: 'apartment',
    status: 'ready',
    deliveryYear: 2025,
    featured: false,
  },

  // INDEX I WEALTH MANAGEMENT
  {
    slug: 'gldani-by-index',
    titleEn: 'Gldani by Index',
    titleKa: 'გლდანი ბაი ინდექსი',
    titleRu: 'Глдани от Индекс',
    descriptionEn: 'Budget-friendly residential complex in Gldani on Ramaz Shengelia Street. Entry-level investment opportunity with affordable pricing.',
    descriptionKa: 'ბიუჯეტური საცხოვრებელი კომპლექსი გლდანში. საწყისი დონის საინვესტიციო შესაძლებლობა.',
    descriptionRu: 'Бюджетный жилой комплекс в Глдани. Начальная инвестиционная возможность.',
    developerSlug: 'index-wealth-management',
    locationCity: 'Tbilisi',
    locationArea: 'Gldani',
    locationAddress: 'Ramaz Shengelia St',
    price: 45000,
    pricePerSqm: 900,
    propertyType: 'apartment',
    status: 'underConstruction',
    deliveryQuarter: 'Q4',
    deliveryYear: 2026,
    featured: false,
  },

  // APART DEVELOPMENT
  {
    slug: 'alphecca-batumi',
    titleEn: 'Alphecca Batumi',
    titleKa: 'ალფექა ბათუმი',
    titleRu: 'Альфекка Батуми',
    descriptionEn: 'Premium residential complex in Batumi on Tamar Mepe Avenue. Urban residential development with contemporary architecture from Apart Development.',
    descriptionKa: 'პრემიუმ საცხოვრებელი კომპლექსი ბათუმში. ურბანული განვითარება თანამედროვე არქიტექტურით.',
    descriptionRu: 'Премиум жилой комплекс в Батуми. Городская застройка с современной архитектурой.',
    developerSlug: 'apart-development',
    locationCity: 'Batumi',
    locationAddress: 'Tamar Mepe Avenue, 1',
    price: 100000,
    pricePerSqm: 2000,
    propertyType: 'apartment',
    status: 'underConstruction',
    deliveryQuarter: 'Q4',
    deliveryYear: 2028,
    featured: false,
  },

  // ANAGI DEVELOPMENT
  {
    slug: 'city-home-kipshidze',
    titleEn: 'City Home Kipshidze',
    titleKa: 'სითი ჰომ ყიფშიძე',
    titleRu: 'Сити Хоум Кипшидзе',
    descriptionEn: 'Modern city apartments in Vake on Nikoloz Qipshidze Street. ISO-certified developer with 30-year operational history in real estate.',
    descriptionKa: 'თანამედროვე ქალაქის აპარტამენტები ვაკეში. ISO სერტიფიცირებული დეველოპერი.',
    descriptionRu: 'Современные городские апартаменты в Ваке. ISO-сертифицированный застройщик.',
    developerSlug: 'anagi-development',
    locationCity: 'Tbilisi',
    locationArea: 'Vake',
    locationAddress: 'Nikoloz Qipshidze St, 20a',
    price: 105000,
    pricePerSqm: 2100,
    propertyType: 'apartment',
    status: 'underConstruction',
    deliveryQuarter: 'Q4',
    deliveryYear: 2025,
    featured: false,
  },

  // PILLAR GROUP
  {
    slug: 'pillar-park-saburtalo',
    titleEn: 'Pillar Park',
    titleKa: 'პილარ პარკი',
    titleRu: 'Пиллар Парк',
    descriptionEn: 'Green residential complex in Saburtalo on Lasha Lashkhia Street. Park-style development with modern amenities.',
    descriptionKa: 'მწვანე საცხოვრებელი კომპლექსი საბურთალოში. პარკის სტილის განვითარება თანამედროვე კენჭისყრით.',
    descriptionRu: 'Зеленый жилой комплекс в Сабуртало. Парковая застройка с современными удобствами.',
    developerSlug: 'pillar-group',
    locationCity: 'Tbilisi',
    locationArea: 'Saburtalo',
    locationAddress: 'Lasha Lashkhia Street 10',
    price: 103014,
    pricePerSqm: 1400,
    priceFrom: 103014,
    propertyType: 'apartment',
    status: 'underConstruction',
    deliveryQuarter: 'Q4',
    deliveryYear: 2026,
    featured: false,
  },

  // ARCHI - Georgia's largest developer
  {
    slug: 'archi-isani',
    titleEn: 'Archi Isani',
    titleKa: 'არჩი ისანი',
    titleRu: 'Арчи Исани',
    descriptionEn: 'Completed residential complex in Isani. Ready for occupancy from Georgia\'s largest developer with 43 total projects and 21 completed.',
    descriptionKa: 'დასრულებული საცხოვრებელი კომპლექსი ისანში. საქართველოს უდიდესი დეველოპერისგან.',
    descriptionRu: 'Завершенный жилой комплекс в Исани. От крупнейшего застройщика Грузии.',
    developerSlug: 'archi',
    locationCity: 'Tbilisi',
    locationArea: 'Isani',
    price: 75000,
    pricePerSqm: 1500,
    propertyType: 'apartment',
    status: 'ready',
    deliveryYear: 2024,
    featured: false,
  },
]

async function main() {
  console.log('🚀 Starting real projects seed...\n')
  console.log(`📊 Total projects to create: ${projectsData.length}\n`)

  // Delete existing projects
  console.log('🗑️  Deleting existing projects...')
  await prisma.project.deleteMany()
  console.log('✅ Existing projects deleted\n')

  // Fetch all developers
  console.log('📋 Fetching developers...')
  const developers = await prisma.developer.findMany()
  const devMap = new Map(developers.map(d => [d.slug, d]))
  console.log(`✅ Found ${developers.length} developers\n`)

  console.log('👷 Creating projects...\n')

  let created = 0
  let skipped = 0

  for (const projectData of projectsData) {
    const developer = devMap.get(projectData.developerSlug)

    if (!developer) {
      console.log(`⚠️  Skipping ${projectData.titleEn} - developer '${projectData.developerSlug}' not found`)
      skipped++
      continue
    }

    try {
      await prisma.project.create({
        data: {
          slug: projectData.slug,
          titleEn: projectData.titleEn,
          titleKa: projectData.titleKa,
          titleRu: projectData.titleRu,
          descriptionEn: projectData.descriptionEn,
          descriptionKa: projectData.descriptionKa,
          descriptionRu: projectData.descriptionRu,
          developerId: developer.id,
          locationCity: projectData.locationCity,
          locationArea: projectData.locationArea,
          locationAddress: projectData.locationAddress,
          price: projectData.price,
          pricePerSqm: projectData.pricePerSqm,
          propertyType: projectData.propertyType,
          status: projectData.status,
          deliveryQuarter: projectData.deliveryQuarter,
          deliveryYear: projectData.deliveryYear,
          featured: projectData.featured,
          published: true,
        },
      })
      created++
      console.log(`✅ Created: ${projectData.titleEn} (${developer.name})`)
    } catch (error) {
      console.error(`❌ Error creating ${projectData.titleEn}:`, error)
      skipped++
    }
  }

  console.log('\n' + '═'.repeat(70))
  console.log(`\n✅ Projects seed completed!`)
  console.log(`   - Created: ${created} projects`)
  console.log(`   - Skipped: ${skipped} projects`)
  console.log(`   - From ${developers.length} developers`)
  console.log(`   - Data Source: korter.ge`)
  console.log('\n📝 Notes:')
  console.log('   - Investment metrics (yield, ROI, IRR) need manual entry')
  console.log('   - Gallery images to be collected separately')
  console.log('   - Additional projects can be added from REAL_PROJECTS_DATA.md\n')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
