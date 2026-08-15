/**
 * Database seed script.
 *
 * Clears existing data and populates the database with an initial admin user
 * for demonstration and development purposes.
 */

import "dotenv/config";

import bcrypt from "bcrypt";
import prisma from "../libs/prisma";

const main = async () => {
  console.log("🧹 Cleaning up existing data...");

  // * Delete all existing data to prevent duplication errors
  await prisma.postContent.deleteMany();
  await prisma.postTag.deleteMany();
  await prisma.post.deleteMany();
  await prisma.tagContent.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();

  console.log("✨ Database cleared!");

  // * 1. Create an admin user
  const email = process.env.ADMIN_EMAIL!;
  const password = process.env.ADMIN_PASSWORD!;
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash }
  });
  console.log(`👤 Created admin user: ${user.email}`);
  console.log("✅ Seeding finished successfully! Your database is now populated with beautiful demo data.");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
