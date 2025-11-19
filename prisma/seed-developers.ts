import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * SOLO Estate - Real Developer Profiles Seed
 * Data sourced from korter.ge
 */

async function main() {
  console.log('🚀 Starting developer profiles seed...\n')

  // Delete existing developers and their projects
  console.log('🗑️  Deleting existing projects...')
  await prisma.project.deleteMany()
  console.log('✅ Existing projects deleted\n')

  console.log('🗑️  Deleting existing developers...')
  await prisma.developer.deleteMany()
  console.log('✅ Existing developers deleted\n')

  console.log('👷 Creating real developer profiles...\n')

  const developers = []

  // 1. VR Holding
  developers.push(await prisma.developer.create({
    data: {
      name: 'VR Holding',
      slug: 'vr-holding',
      descriptionEn: 'VR Holding has been pioneering high-quality standards in construction and real estate development since 2010. Known for luxury resort-style developments in prime locations. The company develops exclusive residential complexes that combine innovation, impeccable style, and impressive design.',
      descriptionKa: 'VR Holding არის მშენებლობისა და უძრავი ქონების განვითარების ხარისხის სტანდარტების პიონერი 2010 წლიდან.',
      descriptionRu: 'VR Holding является пионером высококачественных стандартов в строительстве и девелопменте недвижимости с 2010 года. Известна роскошными проектами курортного типа.',
      website: 'https://vr.ge',
      rating: 4.5,
      completedProjects: 1,
    },
  }))

  // 2. Biograpi Living
  developers.push(await prisma.developer.create({
    data: {
      name: 'Biograpi Living',
      slug: 'biograpi',
      descriptionEn: 'Premium residential developer focusing on high-quality living spaces in prime Tbilisi locations. All projects are classified as "Premium" category, offering modern design, quality materials, and excellent infrastructure. Specializes in creating comfortable urban living environments.',
      descriptionKa: 'პრემიუმ საცხოვრებელი განვითარება თბილისის პრემიუმ ლოკაციებში.',
      descriptionRu: 'Премиум-девелопер жилой недвижимости, фокусирующийся на качественных жилых помещениях в престижных районах Тбилиси.',
      website: 'https://biograpi.ge',
      rating: 4.7,
      completedProjects: 0,
    },
  }))

  // 3. Monolith Group
  developers.push(await prisma.developer.create({
    data: {
      name: 'Monolith Group',
      slug: 'monolith-group',
      descriptionEn: 'Established in 2013, Monolith Group specializes in monolithic-frame technology construction with emphasis on modern design and seismic resilience. The company has successfully completed multiple residential complexes across Tbilisi, known for their quality construction and adherence to modern standards.',
      descriptionKa: 'დაარსებული 2013 წელს, სპეციალიზირებული მონოლითურ-კარკასულ ტექნოლოგიაში.',
      descriptionRu: 'Основанная в 2013 году, Monolith Group специализируется на монолитно-каркасном строительстве с акцентом на современный дизайн и сейсмостойкость.',
      website: 'https://monolith.ge',
      rating: 4.3,
      completedProjects: 7,
    },
  }))

  // 4. Next Group
  developers.push(await prisma.developer.create({
    data: {
      name: 'Next Group',
      slug: 'next-group',
      descriptionEn: 'Leading developer operating in Batumi and Tbilisi, utilizing monolithic-frame technology for seismic stability. Focus on branded hotel residences including Wyndham and Radisson. Next Group is known for delivering quality projects with modern amenities and excellent location selection.',
      descriptionKa: 'წამყვანი დეველოპერი ბათუმსა და თბილისში, სასტუმრო ბრენდირებული რესიდენციები.',
      descriptionRu: 'Ведущий застройщик, работающий в Батуми и Тбилиси, специализирующийся на брендированных отельных резиденциях, включая Wyndham и Radisson.',
      website: 'https://nextgroup.ge',
      rating: 4.6,
      completedProjects: 4,
    },
  }))

  // 5. Index I Wealth Management
  developers.push(await prisma.developer.create({
    data: {
      name: 'Index I Wealth Management',
      slug: 'index-wealth-management',
      descriptionEn: 'Real estate development and wealth management company with multiple residential projects across Tbilisi districts. Focuses on affordable to mid-range residential complexes with good infrastructure and connectivity. All projects located in developing neighborhoods of Tbilisi.',
      descriptionKa: 'უძრავი ქონების განვითარება და სიმდიდრის მართვის კომპანია თბილისის რაიონებში.',
      descriptionRu: 'Компания по развитию недвижимости и управлению активами с множественными жилыми проектами в районах Тбилиси.',
      rating: 4.2,
      completedProjects: 1,
    },
  }))

  // 6. X2 Development
  developers.push(await prisma.developer.create({
    data: {
      name: 'X2 Development',
      slug: 'x2-development',
      descriptionEn: 'Founded in 2014, X2 Development operates in Tbilisi and Bakuriani with focus on quality residential complexes. The company has successfully delivered multiple projects and maintains a reputation for meeting deadlines. Offers a range from affordable to premium residential options.',
      descriptionKa: 'დაარსებული 2014 წელს, მოქმედებს თბილისსა და ბაკურიანში.',
      descriptionRu: 'Основанная в 2014 году, X2 Development работает в Тбилиси и Бакуриани, ориентируясь на качественные жилые комплексы.',
      rating: 4.1,
      completedProjects: 4,
    },
  }))

  // 7. Apart Development
  developers.push(await prisma.developer.create({
    data: {
      name: 'Apart Development',
      slug: 'apart-development',
      descriptionEn: 'Specialized in urban residential developments with focus on Tbilisi\'s Chugureti and Vake districts, as well as select Batumi locations. Known for contemporary architecture and attention to detail. Creates living spaces that combine comfort with modern urban lifestyle.',
      descriptionKa: 'სპეციალიზირებული ურბანული საცხოვრებელი განვითარებაში ჭუღურეთისა და ვაკის რაიონებში.',
      descriptionRu: 'Специализируется на городской жилой застройке с акцентом на районы Чугурети и Ваке в Тбилиси, а также отдельные локации в Батуми.',
      rating: 4.4,
      completedProjects: 4,
    },
  }))

  // 8. Metropol
  developers.push(await prisma.developer.create({
    data: {
      name: 'Metropol',
      slug: 'metropol',
      descriptionEn: 'One of Georgia\'s most trusted and forward-thinking real estate developers, creating multifunctional developments that combine investment potential with well-planned infrastructure. Known for innovative approach, attention to quality, and strategic project locations in both Tbilisi and Batumi.',
      descriptionKa: 'საქართველოს ერთ-ერთი ყველაზე სანდო და მოწინავე უძრავი ქონების დეველოპერი.',
      descriptionRu: 'Один из самых надежных и передовых застройщиков Грузии, создающий многофункциональные комплексы, сочетающие инвестиционный потенциал с продуманной инфраструктурой.',
      rating: 4.5,
      completedProjects: 1,
    },
  }))

  // 9. Alliance Group
  developers.push(await prisma.developer.create({
    data: {
      name: 'Alliance Group',
      slug: 'alliance-group',
      descriptionEn: 'Founded in 2005, Alliance Group operates in Batumi, Tbilisi, and Kobuleti with premium residential projects. The company has established a strong reputation for delivering high-quality developments in prime coastal and urban locations. Focus on creating exclusive residential complexes.',
      descriptionKa: 'დაარსებული 2005 წელს, მოქმედებს ბათუმში, თბილისსა და ქობულეთში პრემიუმ პროექტებით.',
      descriptionRu: 'Основанная в 2005 году, Alliance Group работает в Батуми, Тбилиси и Кобулети с премиальными жилыми проектами.',
      rating: 4.6,
      completedProjects: 2,
    },
  }))

  // 10. Gumbati Group
  developers.push(await prisma.developer.create({
    data: {
      name: 'Gumbati Group',
      slug: 'gumbati-group',
      descriptionEn: 'Active since 1998, Gumbati Group is a leader on the Georgian real estate market with over 500,000 m² developed. The company was the first construction company to start operating on the real estate market in Batumi. In addition to construction work, produces building materials and provides engineering and design services.',
      descriptionKa: 'აქტიური 1998 წლიდან, ლიდერი საქართველოს უძრავი ქონების ბაზარზე 500,000+ მ² განვითარებული.',
      descriptionRu: 'Работает с 1998 года, Gumbati Group является лидером на рынке недвижимости Грузии с более чем 500 000 м² застройки. Первая строительная компания, начавшая работу на рынке недвижимости в Батуми.',
      website: 'https://gumbati.ge',
      rating: 4.7,
      completedProjects: 6,
    },
  }))

  // 11. Archi
  developers.push(await prisma.developer.create({
    data: {
      name: 'Archi',
      slug: 'archi',
      descriptionEn: 'Founded in 2006, Archi Group is one of Georgia\'s largest and most prominent developers with 43 total projects across Tbilisi, Batumi, Bakuriani, and Rustavi. The company has revolutionized the Georgian real estate market with its scale and quality. Known for reliable construction, modern design, and wide range of offerings from affordable to premium.',
      descriptionKa: 'დაარსებული 2006 წელს, არჩი ჯგუფი საქართველოს უდიდესი დეველოპერია 43 პროექტით.',
      descriptionRu: 'Основанная в 2006 году, Archi Group является одним из крупнейших застройщиков Грузии с 43 проектами в Тбилиси, Батуми, Бакуриани и Рустави.',
      website: 'https://archi.ge',
      rating: 4.8,
      completedProjects: 21,
    },
  }))

  // 12. ELT Building
  developers.push(await prisma.developer.create({
    data: {
      name: 'ELT Building',
      slug: 'elt-building',
      descriptionEn: 'Young construction and development company founded in 2017, operating primarily in Batumi and Tbilisi. Despite being relatively new, has already delivered multiple completed projects. Focuses on modern residential complexes with good infrastructure and coastal locations in Batumi.',
      descriptionKa: 'ახალგაზრდა სამშენებლო და განვითარების კომპანია, დაარსებული 2017 წელს.',
      descriptionRu: 'Молодая строительная и девелоперская компания, основанная в 2017 году, работающая в основном в Батуми и Тбилиси.',
      rating: 4.2,
      completedProjects: 4,
    },
  }))

  // 13. Domus Development
  developers.push(await prisma.developer.create({
    data: {
      name: 'Domus Development',
      slug: 'domus-development',
      descriptionEn: 'Operating since 2006, Domus Development maintains active presence in Tbilisi and Batumi with focus on premium residential complexes. Known for developing high-end properties in prestigious neighborhoods, particularly in Vake district. The company has an extensive portfolio of completed luxury projects.',
      descriptionKa: 'მოქმედებს 2006 წლიდან, აქტიური თბილისსა და ბათუმში პრემიუმ კომპლექსებით.',
      descriptionRu: 'Работает с 2006 года, Domus Development поддерживает активное присутствие в Тбилиси и Батуми с акцентом на премиальные жилые комплексы.',
      rating: 4.5,
      completedProjects: 10,
    },
  }))

  // 14. Anagi Development
  developers.push(await prisma.developer.create({
    data: {
      name: 'Anagi Development',
      slug: 'anagi-development',
      descriptionEn: 'Established in 2019, holds ISO 45001:2018 and ISO 9001:2015 certificates demonstrating commitment to quality and safety standards. Despite being recently established, the company has 30-year operational history in real estate development. Focuses on creating quality residential spaces in Tbilisi and Batumi.',
      descriptionKa: 'დაარსებული 2019 წელს, აქვს ISO 45001:2018 და ISO 9001:2015 სერტიფიკატები.',
      descriptionRu: 'Основанная в 2019 году, имеет сертификаты ISO 45001:2018 и ISO 9001:2015. Несмотря на недавнее создание, компания имеет 30-летнюю историю работы в сфере недвижимости.',
      rating: 4.4,
      completedProjects: 2,
    },
  }))

  // 15. Blox
  developers.push(await prisma.developer.create({
    data: {
      name: 'Blox',
      slug: 'blox',
      descriptionEn: 'Operating since 2016, focusing on residential complexes built with high-quality materials and European standards across Tbilisi and Gudauri. The company has quickly established itself in the market with multiple successful projects. Known for good value propositions and reliable construction.',
      descriptionKa: 'მოქმედებს 2016 წლიდან, ფოკუსირება მაღალი ხარისხის მასალებით აშენებულ კომპლექსებზე.',
      descriptionRu: 'Работает с 2016 года, фокусируясь на жилых комплексах, построенных из высококачественных материалов по европейским стандартам в Тбилиси и Гудаури.',
      rating: 4.3,
      completedProjects: 4,
    },
  }))

  // 16. Pillar Group
  developers.push(await prisma.developer.create({
    data: {
      name: 'Pillar Group',
      slug: 'pillar-group',
      descriptionEn: 'Young developer that began operations in 2019, focusing on residential developments across various Tbilisi districts. Despite being new to the market, the company has already completed several projects and established a presence in the Georgian real estate sector. Offers mid-range residential options.',
      descriptionKa: 'ახალგაზრდა დეველოპერი, რომელმაც დაიწყო ოპერაციები 2019 წელს.',
      descriptionRu: 'Молодой застройщик, начавший деятельность в 2019 году, ориентирующийся на жилую застройку в различных районах Тбилиси.',
      rating: 4.0,
      completedProjects: 4,
    },
  }))

  console.log(`✅ Created ${developers.length} developer profiles\n`)

  console.log('📊 Summary:')
  console.log(`   - Total Developers: ${developers.length}`)
  console.log(`   - Largest: Archi (43 total projects, 21 completed)`)
  console.log(`   - Most Experienced: Gumbati Group (since 1998, 500,000+ m²)`)
  console.log(`   - Newest: Anagi Development (2019)`)
  console.log(`   - Highest Rated: Archi (4.8/5.0)\n`)

  console.log('🎉 Developer profiles seed completed successfully!\n')
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
