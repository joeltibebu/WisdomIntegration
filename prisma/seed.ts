import { PrismaClient, Role } from './generated/client/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient({ accelerateUrl: process.env.DATABASE_URL! })

const SALT_ROUNDS = 10

const testUsers: { email: string; name: string; role: Role }[] = [
  { email: 'parent@example.com', name: 'Test Parent', role: Role.PARENT },
  { email: 'therapist@example.com', name: 'Test Therapist', role: Role.THERAPIST },
  { email: 'admin@example.com', name: 'Test Admin', role: Role.ADMIN },
]

async function main() {
  console.log('Seeding test users...')

  for (const user of testUsers) {
    const passwordHash = await bcrypt.hash('password123', SALT_ROUNDS)
    await prisma.user.upsert({
      where: { email: user.email },
      update: { passwordHash, name: user.name, role: user.role, active: true },
      create: { email: user.email, passwordHash, name: user.name, role: user.role, active: true },
    })
    console.log(`  ✓ ${user.role}: ${user.email}`)
  }

  console.log('Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
