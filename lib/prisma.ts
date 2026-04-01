import { PrismaClient } from '../prisma/generated/client/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

// Query logging is enabled in development to monitor performance.
// N+1 Prevention: all dashboard queries use Prisma's include/select to eagerly load
// related data in a single query rather than issuing per-row follow-up queries.
// Examples:
//   - Children list: includes therapist relation
//   - Sessions list: includes child and therapist relations
//   - Caseload: includes sessions and goals via include
// This ensures O(1) queries per page load regardless of dataset size.

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ 
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'] 
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
