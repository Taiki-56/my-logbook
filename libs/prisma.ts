/**
 * Initializes and exports a singleton instance of the Prisma Client.
 *
 * Uses the PrismaPg adapter for PostgreSQL connections and implements a global
 * caching strategy to prevent multiple connection instances from being created
 * during Next.js hot reloading in development mode.
 */

import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client";

// * Attach Prisma to the global object in development to avoid connection limit issues
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
