import { PrismaClient } from '../prisma/generated/client/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  const books = await prisma.book.findMany({ orderBy: { createdAt: 'asc' } })
  console.log(`Found ${books.length} books:`)
  books.forEach(b => console.log(`  - [${b.id}] ${b.title} (active: ${b.active})`))
  await prisma.$disconnect()
  await pool.end()
}

main().catch(console.error)
