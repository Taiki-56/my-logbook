/**
 * Configures NextAuth.js for the application.
 *
 * Uses the Prisma adapter for database integration and a JWT-based strategy
 * for session management (2-hour expiry, 30-minute rolling updates).
 * Includes a Credentials provider that authenticates users against the database
 * using bcrypt for password verification.
 */

import prisma from "@/libs/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    // * Session validity period = 2 hours
    maxAge: 2 * 60 * 60,
    // * Interval (in seconds) to automatically extend the expiration (rolling session)
    updateAge: 30 * 60
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });
        if (!user || !user.passwordHash) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password as string, user.passwordHash);
        if (!isPasswordValid) return null;

        return { id: user.id, email: user.email };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
});
