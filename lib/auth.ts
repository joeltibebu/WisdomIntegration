// API Response Convention: all API routes in this project return { data, error } shape.
// Success: { data: T, error: null }
// Error:   { data: null, error: { code: string, message: string } }
// This convention is established and enforced across all /api/* route handlers.

import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (!user || !user.active) return null
        const valid = await bcrypt.compare(credentials.password, user.passwordHash)
        if (!valid) return null
        return { id: user.id, email: user.email, name: user.name, role: user.role }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { 
        token.id = user.id; 
        token.role = (user as unknown as { role: "PARENT" | "THERAPIST" | "ADMIN" }).role 
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) { 
        session.user.id = token.id as string; 
        session.user.role = token.role as "PARENT" | "THERAPIST" | "ADMIN"
      }
      return session
    },
  },
  pages: { signIn: '/auth/login', error: '/auth/error' },
  session: { strategy: 'jwt' },
}
