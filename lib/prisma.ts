import { PrismaClient } from '../prisma/generated/client/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  // Strip channel_binding param — not supported by node-postgres
  const rawUrl = process.env.DATABASE_URL ?? ''
  const cleanUrl = rawUrl.replace(/[?&]channel_binding=[^&]*/g, '').replace(/\?$/, '').replace(/&$/, '')

  const pool = new pg.Pool({
    connectionString: cleanUrl,
    ssl: { rejectUnauthorized: false },
    max: 1, // Serverless: keep pool small
  })

  const adapter = new PrismaPg(pool)
  return new PrismaClient({
    adapter,
    log: ['error'],
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
