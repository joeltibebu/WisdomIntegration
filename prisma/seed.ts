import { PrismaClient } from './generated/client/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import bcrypt from 'bcryptjs'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // 1. Create Admin User
  const adminEmail = 'admin@wisdom.com'
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('admin123', 10)
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Wisdom Admin',
        passwordHash,
        role: 'ADMIN',
      },
    })
    console.log('Admin user created: admin@wisdom.com / admin123')
  }

  // 2. Hero Sections
  await prisma.heroSection.upsert({
    where: { page: 'home' },
    update: {},
    create: {
      page: 'home',
      badge: 'Love • Care • Heal',
      badgeAm: 'ፍቅር • እንክብካቤ • ፈውስ',
      title: 'Bringing Healing, Hope, and Belonging',
      titleAm: 'ፈውስ ተስፋ እና ባለቤትነትን ማምጣት',
      description: 'Wisdom Integration Ministry walks alongside families navigating special needs — with faith, professional care, and radical belonging.',
      descriptionAm: 'ዊዝደም ኢንቲግሬሽን ሚኒስትሪ ልዩ ፍላጎት ያላቸው ልጆችን ለሚያሳድጉ ቤተሰቦች ከጎናቸው ይቆማል — በእምነት፣ በሙያዊ እንክብካቤ እና ሙሉ ተቀባይነት።',
      ctaText: 'Donate Now',
      ctaLink: '/donate',
    }
  })

  await prisma.heroSection.upsert({
    where: { page: 'about' },
    update: {},
    create: {
      page: 'about',
      badge: 'Our Emotional Journey',
      badgeAm: 'ስሜታዊ ጉዞአችን',
      title: 'Wisdom Integration Ministry',
      titleAm: 'ዊዝደም ኢንቲግሬሽን ሚኒስትሪ',
      description: 'A story of unconditional love, unyielding faith, and the transformation of a family\'s trial into a nationwide ministry.',
      descriptionAm: 'የወንድም ዳንኤል እና የእህት የኔነሽን ታሪክ፣ እንዲሁም በጥበብ የመቀላቀልን ራዕይ ይወቁ።',
    }
  })

  // 3. Homepage Features
  // Clean start for features to ensure ordering and no duplicates
  await prisma.homepageFeature.deleteMany({})
  const features = [
    {
      href: "/about",
      badge: "Our Story",
      badgeAm: "ታሪካችን",
      title: "Our Heart & Roots",
      titleAm: "ልባችን እና መሠረታችን",
      description: "Born from 20 years of lived experience raising a child with autism — learn who we are, what drives us, and the faith that anchors everything we do.",
      descriptionAm: "ልጆች ሁሉ የእግዚአብሔር ስጦታ መሆናቸውን አገር አምኖ ተቀብሎ በእድገታቸው ውስንነት ምክንያት አፍረውና አዝነው ቤታቸው የተቀመጡ ወጥተው እንዲቀላቀሉ ነው፡፡",
      color: "from-wisdom-blue to-wisdom-green",
      accentColor: "bg-wisdom-blue",
      iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      order: 1
    },
    {
      href: "/services",
      badge: "What We Offer",
      badgeAm: "አገልግሎታችን",
      title: "Our Services",
      titleAm: "የእኛ አገልግሎቶች",
      description: "From parent counseling to spiritual care and inclusive learning — explore our holistic range of ministry services designed for your family.",
      descriptionAm: "ይህ ጥበብ ፍቅር ነው፡፡ ግዜን እውቀትን መስጠት ነው፡፡",
      color: "from-wisdom-green to-wisdom-yellow",
      accentColor: "bg-wisdom-green",
      iconPath: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
      order: 2
    },
    {
      href: "/programs",
      badge: "Join Us",
      badgeAm: "ይቀላቀሉን",
      title: "Programs & Events",
      titleAm: "ፕሮግራሞች እና ዝግጅቶች",
      description: "Workshops, community nights, and family retreats — find an upcoming program designed to bring your family hope, healing, and belonging.",
      descriptionAm: "ከሁሉም በላይ ሰውና እግዚአብሔርን የሚያስታርቀውን የመኖርን የሚነግረንን መንገድና ትርጉም ወንጌል መስበክ ነው፡፡",
      color: "from-wisdom-orange to-wisdom-yellow",
      accentColor: "bg-wisdom-orange",
      iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      order: 3
    }
  ]

  for (const f of features) {
    await prisma.homepageFeature.create({ data: f })
  }

  // 4. Page Blocks (About Page)
  await prisma.pageBlock.deleteMany({ where: { page: 'about' } })
  await prisma.pageBlock.createMany({
    data: [
      {
        page: 'about',
        section: 'story-founders',
        title: 'Integrating with Wisdom.',
        titleAm: 'በጥበብ መቀላቀል።',
        content: 'Wisdom Integration Ministry is the name of our service. Its meaning is "integrating with wisdom". The founders who received this vision are Brother Daniel Takele and Sister Yenenesh.',
        contentAm: 'ዊዝደም ኢንቲግሬሽን ሚኒስትሪ የአገልግሎታችን ስም ነው፡፡ ትርጉሙ በጥበብ መቀላቀል ማለት ነው፡፡ ይህን ራዕይ ተቀብለው ወደ እኛ ያመጡ ቤተስቦች ወንድም ዳንኤል ታከለ እና እህት የኔነሽ ይባላሉ፡፡',
        imageUrl: '/images/kaleb.jpeg',
        order: 1
      },
      {
        page: 'about',
        section: 'story-kaleb',
        title: "Kaleb's Story",
        titleAm: 'የካሌብ ታሪክ',
        content: "Their second child, Kaleb, has lived with autism for the last 20 years. To share the wisdom they used to raise their child and help other families like theirs, they established this ministry alongside their friends.",
        contentAm: 'በቤታቸው ውስጥ ሁለተኛ ልጃቸው ካሌብ ይባላል፣ ላለፉት 20 ዓመታት የኦትዝም ተጠቂ ነው:: ልጃቸውን ለማሳደግ የተጠቀሙበትን ጥበብ በማካፈል ለሌሎች እንደነሱ ያሉ ቤተሰቦችን ለመርዳት ሲሉ ይህን አገልግሎት ከጓደኞቻቸው ጋር መስርተዋል::',
        imageUrl: '/images/kaleb2.jpeg',
        order: 2
      },
      {
        page: 'about',
        section: 'purpose-main',
        title: 'Our Core Purpose',
        titleAm: 'የዊዝደም ኢንተግሬሽን ዓላማ',
        content: 'The primary purpose of Wisdom Integration is to help families whose hearts are broken because of the challenges with their children find their way to the Lord—the only one who can truly mend the broken.',
        contentAm: 'በልጆቻቸው ምክንያት ልባቸው ለተሰበረባቸው ቤተሰቦች የተስበረን መጠገን ወደሚችለው ጌታ እንዲመጡ እና ስብራታቸውን በቃሉ ብርሃን እንዲፈወሱ ማገዝ ነው፡፡',
        order: 3
      }
    ]
  })

  // outcomes
  const outcomes = [
    { en: "For the nation to accept that all children are God's gift, helping those hidden in shame or sorrow to come out and integrate.", am: "ልጆች ሁሉ የእግዚአብሔር ስጦታ መሆናቸውን አገር አምኖ ተቀብሎ በእድገታቸው ውስንነት ምክንያት አፍረውና አዝነው ቤታቸው የተቀመጡ ወጥተው እንዲቀላቀሉ ነው::" },
    { en: "This wisdom is love. It is the active giving of time and knowledge.", am: "ይህ ጥበብ ፍቅር ነው፡፡ ግዜን እውቀትን መስጠት ነው፡፡" },
    { en: "Above all, to preach the Gospel which reconciles man with God, revealing the true meaning of life.", am: "ከሁሉም በላይ ሰውና እግዚአብሔርን የሚያስታርቀውን የመኖርን የሚነግረንን መንገድና ትርጉም ወንጌል መስበክ ነው፡፡" },
    { en: "To achieve this, we need truly prepared, dedicated children of God.", am: "ለዚህም እውነተኛ የተዘጋጁ የእግዚአብሔር ልጆች ያስፈልጉናል::" }
  ]

  for (let i = 0; i < outcomes.length; i++) {
    await prisma.pageBlock.create({
      data: {
        page: 'about',
        section: 'outcome',
        content: outcomes[i].en,
        contentAm: outcomes[i].am,
        order: 10 + i
      }
    })
  }

  // 5. Books — only seed if none exist
  const bookCount = await prisma.book.count()
  if (bookCount === 0) {
    await prisma.book.createMany({
      data: [
        { title: "From Our Journey to Yours", titleAm: "ከእኛ ጉዞ ወደ እርስዎ", author: "Daniel Takele", description: "Deeply personal account of faith and resilience.", descriptionAm: "ጥልቅ የሆነ የእምነት ታሪክ።", coverImageUrl: "/images/book-cover.png", active: true },
        { title: "Walking with Grace", titleAm: "በጸጋ መመላለስ", author: "Daniel Takele", description: "Finding strength in God's grace.", descriptionAm: "በእግዚአብሔር ጸጋ ጥንካሬን ማግኘት።", coverImageUrl: "/images/book1.jpeg", active: true },
        { title: "Family Faith Anchors", titleAm: "የቤተሰብ እምነት መልሕቆች", author: "Yenenesh", description: "Anchoring the family in prayer.", descriptionAm: "ቤተሰብን በጸሎት ማጽናት።", coverImageUrl: "/images/book2.jpeg", active: true }
      ]
    })
  }

  // 6. Programs (using PageBlock model for simplicity or dedicated model)
  // I'll use the 'HomepageFeature' model as 'slots' or just dedicated PageBlocks.
  // Actually, let's use the 'Event' model if they are events, but these look like static 'Programs'.
  // I'll use PageBlock with section 'program'.
  await prisma.pageBlock.deleteMany({ where: { section: 'program' } })
  await prisma.pageBlock.createMany({
    data: [
      {
        page: 'programs',
        section: 'program',
        title: 'Early Intervention',
        titleAm: 'የቅድመ ጣልቃ ገብነት',
        content: 'Intensive, play-based support for infants and toddlers showing signs of developmental delay, involving the whole family.',
        contentAm: 'የዕድገት መዘግየት ምልክቶች ለሚያሳዩ ሕፃናት እና ታዳጊዎች በጥልቅ ጨዋታ ላይ የተመሠረተ ድጋፍ፣ መላውን ቤተሰብ የሚያሳትፍ፡፡',
        order: 1
      },
      {
        page: 'programs',
        section: 'program',
        title: 'School-Age Support',
        titleAm: 'በትምህርት ዕድሜ ላይ ያለ ድጋፍ',
        content: 'Academic and therapeutic support focusing on learning differences, executive function, and social confidence.',
        contentAm: 'ለትምህርት ልዩነቶች፣ ለሥራ አመራር ተግባር እና ለማኅበራዊ በራስ መተማመንም ላይ ያተኮረ ትምህርታዊ እና ሕክምናዊ ድጋፍ፡፡',
        order: 2
      },
      {
        page: 'programs',
        section: 'program',
        title: 'Family Partnership',
        titleAm: 'የቤተሰብ አጋርነት',
        content: 'Long-term coaching and education for parents to reinforce therapeutic goals and build a resilient home environment.',
        contentAm: 'ወላጆች የሕክምና ግቦችን እንዲያጠናክሩ እና ጠንካራ የቤተሰብ ሁኔታን እንዲገነቡ የረጅም ጊዜ ስልጠና እና ትምህርት፡፡',
        order: 3
      }
    ]
  })

  // 7. Actual Events (Workshops etc)
  await prisma.event.deleteMany({})
  await prisma.event.createMany({
    data: [
      {
        title: "Community Outreach Seminar",
        titleAm: "የማህበረሰብ ግንባታ ሴሚናር",
        description: "Join us for an afternoon of awareness and education on autism and developmental integration.",
        descriptionAm: "በኦቲዝም እና በልማት ውህደት ላይ የግንዛቤ እና ትምህርት ለማግኘት ከእኛ ጋር ይሁኑ።",
        date: new Date("2024-05-15T14:00:00Z"),
        location: "Addis Ababa, Wisdom Center",
        locationAm: "አዲስ አበባ፣ ዊዝደም ሴንተር",
        active: true
      }
    ]
  })

  // 8. Testimonials
  const testimonialCount = await prisma.testimonial.count()
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          name: "Sarah & Daniel M.",
          role: "Parents of a child with Autism",
          content: "Wisdom Integration changed everything for us. Before, we were hiding our son out of shame and simply didn't know how to cope. Now, we've found a community that embraces him as a true gift from God.",
          order: 1,
          active: true,
        },
        {
          name: "James K.",
          role: "Father",
          content: "The spiritual care and counseling mended our broken hearts. We came feeling profoundly exhausted and isolated, but we found true belonging and healing through their holistic ministry.",
          order: 2,
          active: true,
        },
        {
          name: "Priya & Tomas L.",
          role: "Family Members",
          content: "They don't just provide therapy; they provide love. The team gives their time, knowledge, and faith unconditionally. For the first time, our family feels deeply valued and understood.",
          order: 3,
          active: true,
        },
      ],
    })
  }

  // 9. Site Settings (defaults)
  await prisma.siteSetting.upsert({
    where: { key: 'contact' },
    update: {},
    create: {
      key: 'contact',
      value: {
        phone: '+1 (555) 000-0000',
        email: 'info@wisdomintegration.org',
        address: 'Addis Ababa, Ethiopia',
      },
    },
  })
  await prisma.siteSetting.upsert({
    where: { key: 'social' },
    update: {},
    create: {
      key: 'social',
      value: {
        facebook: 'https://facebook.com/wisdomintegration',
        instagram: '',
        youtube: '',
        twitter: '',
      },
    },
  })

  // 10. Services — only seed if none exist
  const serviceCount = await prisma.service.count()
  if (serviceCount === 0) {
    const services = [
      { name: "Parent Counseling", description: "Compassionate guidance and emotional support for parents navigating the unique challenges of raising a child with developmental needs.", active: true },
      { name: "Spiritual Care", description: "Faith-based encouragement anchoring families in the truth of the Gospel, offering deep emotional reconciliation and lasting peace.", active: true },
      { name: "Inclusive Learning", description: "Tailored educational assistance designed to help children with unique limitations discover and reach their full divine potential.", active: true },
      { name: "Community Integration", description: "Helping families step out of isolation by providing safe, inclusive environments where they belong and are truly valued.", active: true },
      { name: "Holistic Therapy", description: "Practical therapies encompassing speech, occupational, and behavioral support tailored to nurture earthly and spiritual life.", active: true },
      { name: "Family Care & Respite", description: "Offering practical assistance and dedicated rest periods for parents so they can recharge and continue loving their families deeply.", active: true },
    ]
    for (const s of services) {
      await prisma.service.create({ data: s })
    }
    console.log('Services seeded.')
  }

  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


