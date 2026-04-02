import { PrismaClient } from '../prisma/generated/client/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
  const adapter = new PrismaPg(pool)
  // @ts-ignore — use generated client directly
  const prisma = new PrismaClient({ adapter, datasources: { db: { url: process.env.DATABASE_URL } } })

  const count = await prisma.service.count()
  if (count > 0) {
    console.log(`Services already exist (${count}). Skipping seed.`)
    await prisma.$disconnect()
    await pool.end()
    return
  }

  const services = [
    {
      name: "Parent Counseling",
      nameAm: "የወላጆች ምክር",
      description: "Compassionate guidance and emotional support for parents navigating the unique challenges of raising a child with developmental needs.",
      descriptionAm: "ልዩ ፍላጎት ያላቸውን ልጆች ሲያሳድጉ ለሚያጋጥሙ ወላጆች ርህሩህ መመሪያ እና ስሜታዊ ድጋፍ።",
      colorClass: "text-wisdom-orange",
      bgClass: "bg-wisdom-orange/10 border-wisdom-orange/20",
      iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      order: 1,
    },
    {
      name: "Spiritual Care",
      nameAm: "መንፈሳዊ እንክብካቤ",
      description: "Faith-based encouragement anchoring families in the truth of the Gospel, offering deep emotional reconciliation and lasting peace.",
      descriptionAm: "ቤተሰቦችን በወንጌል እውነት ላይ የሚያቆም የእምነት ማበረታቻ፣ ጥልቅ ስሜታዊ ዕርቅ እና ዘላቂ ሰላምን ይሰጣል።",
      colorClass: "text-wisdom-yellow",
      bgClass: "bg-wisdom-yellow/10 border-wisdom-yellow/20",
      iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      order: 2,
    },
    {
      name: "Inclusive Learning",
      nameAm: "አካታች ትምህርት",
      description: "Tailored educational assistance designed to help children with unique limitations discover and reach their full divine potential.",
      descriptionAm: "ልዩ ውስንነት ያላቸው ልጆች ሙሉ መለኮታዊ አቅማቸውን እንዲያገኙ ለመርዳት የተዘጋጀ ልዩ የትምህርት ድጋፍ።",
      colorClass: "text-wisdom-green",
      bgClass: "bg-wisdom-green/10 border-wisdom-green/20",
      iconPath: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
      order: 3,
    },
    {
      name: "Community Integration",
      nameAm: "የማኅበረሰብ ውህደት",
      description: "Helping families step out of isolation by providing safe, inclusive environments where they belong and are truly valued.",
      descriptionAm: "ቤተሰቦች ከብቸኝነት እንዲወጡ ሲረዳ፣ ባለቤትነት ሚሰማቸው እና ዋጋ የሚሰጣቸው ደህንነቱ የተጠበቀ አካታች አካባቢ ይሰጣቸዋል።",
      colorClass: "text-wisdom-blue",
      bgClass: "bg-wisdom-blue/10 border-wisdom-blue/20",
      iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
      order: 4,
    },
    {
      name: "Holistic Therapy",
      nameAm: "አጠቃላይ ሕክምና",
      description: "Practical therapies encompassing speech, occupational, and behavioral support tailored to nurture earthly and spiritual life.",
      descriptionAm: "ምድራዊ እና መንፈሳዊ ሕይወትን ለማሳደግ የተዘጋጀ ንግግር፣ ሙያዊ እና የባህሪ ድጋፍን የሚያካትት ተግባራዊ ሕክምናዎች።",
      colorClass: "text-emerald-500",
      bgClass: "bg-emerald-500/10 border-emerald-500/20",
      iconPath: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      order: 5,
    },
    {
      name: "Family Care & Respite",
      nameAm: "የቤተሰብ እንክብካቤ እና እረፍት",
      description: "Offering practical assistance and dedicated rest periods for parents so they can recharge and continue loving their families deeply.",
      descriptionAm: "ወላጆች ጉልበት ሞልቶ ቤተሰቦቻቸውን ጥልቅ ፍቅር ሲወዱ ለመቀጠል ተግባራዊ ድጋፍ እና ልዩ የእረፍት ጊዜ ይሰጣቸዋል።",
      colorClass: "text-rose-500",
      bgClass: "bg-rose-500/10 border-rose-500/20",
      iconPath: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      order: 6,
    },
  ]

  for (const s of services) {
    await prisma.service.create({ data: s })
  }

  console.log(`Seeded ${services.length} services.`)
  await prisma.$disconnect()
  await pool.end()
}

main().catch(console.error)
