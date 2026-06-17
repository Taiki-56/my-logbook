import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

//* This file creates a Prisma Client and attaches it to the global object
//* so that only one instance of the client is created in your application.
//* This helps resolve issues with hot reloading that can occur when using Prisma ORM with Next.js in development mode.
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});
console.log("DATABASE_URL =", process.env.DATABASE_URL);
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;
