import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...\n')

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@soloestate.com' },
    update: {},
    create: {
      email: 'admin@soloestate.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin'
    }
  })

  console.log('✅ Created admin user:', admin.email)
  console.log('📧 Email: admin@soloestate.com')
  console.log('🔑 Password: admin123')
  console.log('⚠️  Please change this password after first login!\n')

  // Create Developers
  const developers = await Promise.all([
    prisma.developer.upsert({
      where: { slug: 'batumi-investments' },
      update: {},
      create: {
        name: 'Batumi Investments',
        slug: 'batumi-investments',
        logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200',
        descriptionEn: 'Leading developer in Batumi with focus on luxury residential and commercial properties',
        descriptionKa: 'წამყვანი დეველოპერი ბათუმში, რომელიც ფოკუსირებულია ლუქს საცხოვრებელ და კომერციულ უძრავ ქონებაზე',
        descriptionRu: 'Ведущий застройщик в Батуми, специализирующийся на элитной жилой и коммерческой недвижимости',
        descriptionHe: 'מפתח מוביל בבאטומי עם התמקדות בנכסים מגורים ומסחריים יוקרתיים',
        rating: 4.8,
        completedProjects: 12,
        website: 'https://batumi-investments.com'
      }
    }),
    prisma.developer.upsert({
      where: { slug: 'georgia-properties' },
      update: {},
      create: {
        name: 'Georgia Properties Group',
        slug: 'georgia-properties',
        logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200',
        descriptionEn: 'Premium property development across Georgia with 20+ years of experience',
        descriptionKa: 'პრემიუმ უძრავი ქონების განვითარება საქართველოში 20+ წლიანი გამოცდილებით',
        descriptionRu: 'Премиум-девелопмент недвижимости по всей Грузии с опытом более 20 лет',
        descriptionHe: 'פיתוח נדל"ן פרימיום ברחבי גאורגיה עם ניסיון של למעלה מ-20 שנה',
        rating: 4.6,
        completedProjects: 28,
        website: 'https://georgia-properties.com'
      }
    }),
    prisma.developer.upsert({
      where: { slug: 'tbilisi-elite' },
      update: {},
      create: {
        name: 'Tbilisi Elite Developments',
        slug: 'tbilisi-elite',
        logo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200',
        descriptionEn: 'Exclusive developments in Tbilisi\'s most prestigious locations',
        descriptionKa: 'ექსკლუზიური განვითარება თბილისის ყველაზე პრესტიჟულ ლოკაციებში',
        descriptionRu: 'Эксклюзивная застройка в самых престижных районах Тбилиси',
        descriptionHe: 'פיתוחים בלעדיים במיקומים היוקרתיים ביותר בטביליסי',
        rating: 4.9,
        completedProjects: 8,
        website: 'https://tbilisi-elite.com'
      }
    })
  ])

  console.log(`✅ Created ${developers.length} developers\n`)

  // Create Projects
  const projects = await Promise.all([
    // Batumi Luxury Aparthotel
    prisma.project.upsert({
      where: { slug: 'batumi-luxury-aparthotel' },
      update: {},
      create: {
        slug: 'batumi-luxury-aparthotel',
        titleEn: 'Batumi Luxury Aparthotel',
        titleKa: 'ბათუმის ლუქს აპარტჰოტელი',
        titleRu: 'Роскошный апартотель в Батуми',
        titleHe: 'אפרטוטל יוקרתי בבאטומי',
        descriptionEn: 'Premium aparthotel in the heart of Batumi with guaranteed rental income and full property management services. Located 100m from the beach.',
        descriptionKa: 'პრემიუმ აპარტჰოტელი ბათუმის გულში, გარანტირებული საიჯარო შემოსავლითა და სრული ქონების მართვის სერვისებით. მდებარეობს 100მ-ში სანაპიროდან.',
        descriptionRu: 'Премиум апартотель в центре Батуми с гарантированным доходом от аренды и полным управлением недвижимостью. Расположен в 100м от пляжа.',
        descriptionHe: 'אפרטוטל פרימיום בלב באטומי עם הכנסה מובטחת מהשכרה ושירותי ניהול נכסים מלאים. ממוקם 100 מטר מהחוף.',
        developerId: developers[0].id,
        status: 'underConstruction',
        propertyType: 'aparthotel',
        area: 45,
        locationCity: 'Batumi',
        locationArea: 'City Center',
        locationAddress: 'Rustaveli Avenue 123',
        locationLat: 41.6415,
        locationLng: 41.6368,
        price: 85000,
        pricePerSqm: 1889,
        currency: 'USD',
        priceRangeMin: 75000,
        priceRangeMax: 120000,
        yield: 8.5,
        capRate: 7.2,
        irr: 12.5,
        monthlyRent: 600,
        occupancy: 85,
        managementFee: 20,
        deliveryQuarter: 'Q4',
        deliveryYear: 2025,
        coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
        gallery: JSON.stringify([
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200'
        ]),
        highlights: JSON.stringify([
          'Guaranteed 8.5% annual yield',
          '100m from beach',
          'Full property management',
          'Furnished & ready to rent',
          'Rooftop pool & gym',
          'Underground parking'
        ]),
        featured: true,
        published: true
      }
    }),

    // Tbilisi Business District Office
    prisma.project.upsert({
      where: { slug: 'tbilisi-business-district-office' },
      update: {},
      create: {
        slug: 'tbilisi-business-district-office',
        titleEn: 'Tbilisi Business District Office Space',
        titleKa: 'თბილისის ბიზნეს დისტრიქტის ოფისი',
        titleRu: 'Офисное помещение в бизнес-районе Тбилиси',
        titleHe: 'משרדים במחוז העסקים בטביליסי',
        descriptionEn: 'Modern A-class office space in Tbilisi\'s new business district. Ideal for investment with high corporate rental demand.',
        descriptionKa: 'თანამედროვე A-კლასის ოფისი თბილისის ახალ ბიზნეს დისტრიქტში. იდეალურია ინვესტიციისთვის მაღალი კორპორატიული საიჯარო მოთხოვნით.',
        descriptionRu: 'Современное офисное помещение класса А в новом деловом районе Тбилиси. Идеально для инвестиций с высоким корпоративным спросом на аренду.',
        descriptionHe: 'שטח משרדים מודרני בדרגה A במחוז העסקים החדש של טביליסי. אידיאלי להשקעה עם ביקוש גבוה להשכרה תאגידית.',
        developerId: developers[2].id,
        status: 'ready',
        propertyType: 'commercial',
        area: 120,
        locationCity: 'Tbilisi',
        locationArea: 'Business District',
        locationAddress: 'Chavchavadze Avenue 78',
        locationLat: 41.7151,
        locationLng: 44.7514,
        price: 180000,
        pricePerSqm: 1500,
        currency: 'USD',
        yield: 7.8,
        capRate: 6.9,
        irr: 10.2,
        monthlyRent: 1170,
        occupancy: 95,
        managementFee: 10,
        coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
        gallery: JSON.stringify([
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
          'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
          'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200'
        ]),
        highlights: JSON.stringify([
          'A-class building',
          'Prime business location',
          '24/7 security',
          'Central HVAC',
          'High-speed elevators',
          'Conference facilities'
        ]),
        featured: true,
        published: true
      }
    }),

    // Black Sea Villa
    prisma.project.upsert({
      where: { slug: 'black-sea-luxury-villa' },
      update: {},
      create: {
        slug: 'black-sea-luxury-villa',
        titleEn: 'Black Sea Luxury Villa',
        titleKa: 'შავი ზღვის ლუქს ვილა',
        titleRu: 'Роскошная вилла на Черном море',
        titleHe: 'וילת יוקרה בים השחור',
        descriptionEn: 'Exclusive villa with panoramic sea views, private pool, and garden. Perfect for luxury living or high-end vacation rental.',
        descriptionKa: 'ექსკლუზიური ვილა პანორამული ზღვის ხედით, კერძო აუზითა და ბაღით. სრულყოფილი ლუქს ცხოვრებისთვის ან მაღალი კლასის სანაპირო დასასვენებლად.',
        descriptionRu: 'Эксклюзивная вилла с панорамным видом на море, частным бассейном и садом. Идеально для роскошной жизни или высококлассной аренды для отдыха.',
        descriptionHe: 'וילה בלעדית עם נוף פנורמי לים, בריכה פרטית וגן. מושלם למגורי יוקרה או השכרה לחופשה יוקרתית.',
        developerId: developers[1].id,
        status: 'offPlan',
        propertyType: 'villa',
        area: 350,
        locationCity: 'Batumi',
        locationArea: 'Green Cape',
        locationAddress: 'Green Cape Resort Area',
        locationLat: 41.6151,
        locationLng: 41.5975,
        price: 650000,
        pricePerSqm: 1857,
        currency: 'USD',
        yield: 6.5,
        capRate: 5.8,
        irr: 9.5,
        deliveryQuarter: 'Q2',
        deliveryYear: 2026,
        coverImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
        gallery: JSON.stringify([
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
          'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200'
        ]),
        highlights: JSON.stringify([
          'Private beach access',
          'Infinity pool',
          'Smart home system',
          '5 bedrooms, 4 bathrooms',
          'Landscaped garden',
          'Panoramic sea views',
          'Underground garage for 3 cars'
        ]),
        featured: true,
        published: true
      }
    }),

    // Tbilisi Student Housing
    prisma.project.upsert({
      where: { slug: 'tbilisi-student-housing' },
      update: {},
      create: {
        slug: 'tbilisi-student-housing',
        titleEn: 'Tbilisi Student Housing Complex',
        titleKa: 'სტუდენტური საცხოვრებელი კომპლექსი თბილისში',
        titleRu: 'Студенческий жилой комплекс в Тбилиси',
        titleHe: 'מתחם דיור לסטודנטים בטביליסי',
        descriptionEn: 'Purpose-built student accommodation near major universities. High occupancy rates and stable rental income guaranteed.',
        descriptionKa: 'სპეციალურად აშენებული სტუდენტური საცხოვრებელი უნივერსიტეტების მახლობლად. მაღალი დაკავებულობა და სტაბილური საიჯარო შემოსავალი გარანტირებული.',
        descriptionRu: 'Специально построенное студенческое жилье рядом с крупными университетами. Гарантированы высокая заполняемость и стабильный доход от аренды.',
        descriptionHe: 'דיור סטודנטים ייעודי ליד אוניברסיטאות מרכזיות. שיעורי תפוסה גבוהים והכנסה יציבה מהשכרה מובטחת.',
        developerId: developers[2].id,
        status: 'underConstruction',
        propertyType: 'apartment',
        area: 25,
        locationCity: 'Tbilisi',
        locationArea: 'Saburtalo',
        locationAddress: 'University Street 45',
        locationLat: 41.7225,
        locationLng: 44.7532,
        price: 45000,
        pricePerSqm: 1800,
        currency: 'USD',
        priceRangeMin: 38000,
        priceRangeMax: 55000,
        yield: 9.2,
        capRate: 8.1,
        irr: 13.5,
        monthlyRent: 345,
        occupancy: 98,
        managementFee: 15,
        deliveryQuarter: 'Q1',
        deliveryYear: 2026,
        coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
        gallery: JSON.stringify([
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200'
        ]),
        highlights: JSON.stringify([
          'Near 3 major universities',
          '98% occupancy rate',
          'Full furniture package',
          'Study areas & common rooms',
          '24/7 security',
          'High-speed internet included'
        ]),
        featured: true,
        published: true
      }
    }),

    // Batumi Beachfront Apartment
    prisma.project.upsert({
      where: { slug: 'batumi-beachfront-apartment' },
      update: {},
      create: {
        slug: 'batumi-beachfront-apartment',
        titleEn: 'Batumi Beachfront Apartment',
        titleKa: 'ბათუმის სანაპირო ბინა',
        titleRu: 'Квартира на берегу моря в Батуми',
        titleHe: 'דירה על החוף בבאטומי',
        descriptionEn: 'Modern apartment with direct beach access. Fully furnished and equipped for immediate rental or personal use.',
        descriptionKa: 'თანამედროვე ბინა პირდაპირი სანაპირო წვდომით. სრულად მომწყობილი და აღჭურვილი დაუყოვნებელი გაქირავებისთვის ან პირადი გამოყენებისთვის.',
        descriptionRu: 'Современная квартира с прямым выходом на пляж. Полностью меблирована и оборудована для немедленной аренды или личного пользования.',
        descriptionHe: 'דירה מודרנית עם גישה ישירה לחוף. מרוהטת ומצוידת במלואה להשכרה מיידית או שימוש אישי.',
        developerId: developers[0].id,
        status: 'ready',
        propertyType: 'apartment',
        area: 65,
        locationCity: 'Batumi',
        locationArea: 'New Boulevard',
        locationAddress: 'New Boulevard 234',
        locationLat: 41.6392,
        locationLng: 41.6247,
        price: 95000,
        pricePerSqm: 1462,
        currency: 'USD',
        yield: 7.5,
        capRate: 6.8,
        irr: 11.0,
        monthlyRent: 595,
        occupancy: 80,
        managementFee: 18,
        coverImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
        gallery: JSON.stringify([
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200',
          'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=1200'
        ]),
        highlights: JSON.stringify([
          'Direct beach access',
          'Sea view balcony',
          'Fully furnished',
          'Ready for immediate occupancy',
          'Concierge service',
          'Swimming pool'
        ]),
        featured: true,
        published: true
      }
    }),

    // Tbilisi Old Town Apartment
    prisma.project.upsert({
      where: { slug: 'tbilisi-old-town-heritage' },
      update: {},
      create: {
        slug: 'tbilisi-old-town-heritage',
        titleEn: 'Old Town Heritage Apartment',
        titleKa: 'ძველი თბილისის მემკვიდრეობის ბინა',
        titleRu: 'Историческая квартира в Старом городе',
        titleHe: 'דירת מורשת בעיר העתיקה',
        descriptionEn: 'Restored historical apartment in Tbilisi\'s charming Old Town. Perfect for Airbnb or boutique rental.',
        descriptionKa: 'აღდგენილი ისტორიული ბინა თბილისის ძველ ქალაქში. სრულყოფილი Airbnb-სთვის ან ბუტიკური გაქირავებისთვის.',
        descriptionRu: 'Отреставрированная историческая квартира в очаровательном Старом городе Тбилиси. Идеально для Airbnb или бутик-аренды.',
        descriptionHe: 'דירה היסטורית משוחזרת בעיר העתיקה המקסימה של טביליסי. מושלם ל-Airbnb או השכרה בוטיקית.',
        developerId: developers[1].id,
        status: 'ready',
        propertyType: 'apartment',
        area: 55,
        locationCity: 'Tbilisi',
        locationArea: 'Old Town',
        locationAddress: 'Shardeni Street 12',
        locationLat: 41.6938,
        locationLng: 44.8075,
        price: 125000,
        pricePerSqm: 2273,
        currency: 'USD',
        yield: 10.5,
        capRate: 9.2,
        irr: 14.8,
        monthlyRent: 1095,
        occupancy: 92,
        managementFee: 25,
        coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
        gallery: JSON.stringify([
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200'
        ]),
        highlights: JSON.stringify([
          'Historical building',
          'Tourist hotspot location',
          'High Airbnb income potential',
          'Restored with modern amenities',
          'Walking distance to attractions',
          'Wine cellar'
        ]),
        featured: false,
        published: true
      }
    })
  ])

  console.log(`✅ Created ${projects.length} projects\n`)

  // Create Global Settings
  await prisma.settings.upsert({
    where: { id: 'global' },
    update: {},
    create: {
      id: 'global',
      siteNameEn: 'SOLO Estate',
      siteNameKa: 'SOLO Estate',
      siteNameRu: 'SOLO Estate',
      siteNameHe: 'SOLO Estate',
      email: 'sales@soloestate.ge',
      phone: '+995 511 107 142',
      whatsapp: '+995555123456',
      address: 'Tbilisi, Georgia',
      defaultMetaTitle: 'SOLO Estate - Premium Real Estate Investment in Georgia',
      defaultMetaDescription: 'Invest in premium real estate across Georgia. Aparthotels, villas, and commercial properties with guaranteed returns.'
    }
  })

  console.log('✅ Created global settings\n')
  console.log('🎉 Database seeded successfully!')
  console.log(`\n📊 Summary:`)
  console.log(`   - 1 Admin user`)
  console.log(`   - ${developers.length} Developers`)
  console.log(`   - ${projects.length} Projects (${projects.filter(p => p.featured).length} featured)`)
  console.log(`   - 1 Settings record\n`)
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
